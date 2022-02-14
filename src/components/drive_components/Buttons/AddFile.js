import { faFileUpload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { addDoc, doc, getDocs, updateDoc, where, query, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { database, storage } from "../../../firebase";
import { ROOT_FOLDER } from "../../../hooks/useFolder";
import { v4 as uuidV4 } from 'uuid';
import { createPortal } from "react-dom";
import { ProgressBar, Toast } from "react-bootstrap";



const AddFile = ({ currentFolder }) => {

	const [uploadingFiles, setUploadingFiles] = useState([]);

	const { currentUser } = useAuth();

	const handleFileUpload = (e) => {
		console.log('clicked');
		const file = e.target.files[0];

		if (currentFolder == null || file == null) {
			return;
		}

		const id = uuidV4();

		setUploadingFiles((prevUploadingFiles) => [
			...prevUploadingFiles, {
				id: id,
				name: file.name,
				progress: 0,
				error: false
			}
		])

		const folderPath = currentFolder.path.map(folder => {
			return folder.name;
		}).join('/');


		const filePath = currentFolder === ROOT_FOLDER
			? `${folderPath}/${file.name}`
			: `${folderPath}/${currentFolder.name}/${file.name}`


		const dataStoragePath = `/files/${currentUser.uid}/${filePath}`

		const uploadTaskRef = ref(storage, dataStoragePath);

		const uploadTask = uploadBytesResumable(uploadTaskRef, file);

		uploadTask.on('state_changed', 
		
			(snapshot) => {
				const progress = snapshot.bytesTransferred / snapshot.totalBytes;

				setUploadingFiles(prevUploadingFiles => {
					return prevUploadingFiles.map(uploadFile => {
						if (uploadFile.id === id) {
							return {
								...uploadFile, progress: progress
							}
						}

						return uploadFile;
					})
				})

			},


			// Error Handling 
			() => {
				setUploadingFiles(prevUploadingFiles => {
					return prevUploadingFiles.filter(uploadFile => {
						if (uploadFile.id === id) {
							return { ...uploadFile, error: true }
						}
						return uploadFile;
					})
				})
			},

			// Success Handling 
			() => {
				console.log("Successfully Uploaded");

				setUploadingFiles(prevUploadingFiles => {
					return prevUploadingFiles.filter(uploadFile => {
						return uploadFile.id !== id;
					})
				})

				getDownloadURL(uploadTask.snapshot.ref).then(fileUrl =>{

					const getFilesQuery = query(database.files, where("name", "==", file.name), where("userId", "==", currentUser.uid), where('folderId', '==', currentFolder.id));

					getDocs(getFilesQuery).then(existingFiles => {
						const existingFile = existingFiles.docs[0];
						if(existingFile){
							const docRef = doc(database.files ,existingFile.id);
							updateDoc(docRef, {
								url: fileUrl
							}).then(() => console.log("Successfully Updated")).catch((e) =>  console.log(e))
						} else{
							addDoc(database.files, {
								url: fileUrl,
								name: file.name,
								createdAt: database.getCurrentTimestamp(),
								folderId: currentFolder.id,
								userId: currentUser.uid
							})
						}
					})

					
				})

			})
	}
	

		return (
			<>
				<label className="btn btn-outline-success btn-sm m-0 mx-2 px-2">
					<FontAwesomeIcon icon={faFileUpload} />
					<input
						type="file"
						onChange={handleFileUpload}
						style={{ opacity: 0, position: 'absolute', left: '-9999px' }}
					/>

				</label>

				{uploadingFiles.length > 0 && createPortal(
					<div
						style={{
							position: 'absolute',
							bottom: '1rem',
							right: '1rem',
							maxWidth: '250px'
						}}
					>
						{uploadingFiles.map(file => {
							return (
								<Toast key={file.id} onClose={
									() => {
										setUploadingFiles(prevUploadingFiles => {
											return prevUploadingFiles.filter(uploadFile => {
												return uploadFile.id !== file.id
											})
										})
									}
								}>
									<Toast.Header closeButton={file.error} className="text-truncate w-100 d-block">
										{file.name}
									</Toast.Header>
									<Toast.Body>
										<ProgressBar
											animated={!file.error}
											variant={file.error ? 'danger' : 'primary'}
											now={file.error ? 100 : file.progress * 100}
											label={
												file.error ? 'Error' : `${Math.round(file.progress * 100)}%`
											}
										/>
									</Toast.Body>
								</Toast>
							)

						})}
					</div>,
					document.body
				)}
			</>
		)
}
	export default AddFile