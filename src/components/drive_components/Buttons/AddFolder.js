import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFolderPlus} from '@fortawesome/free-solid-svg-icons';
import {database} from '../../../firebase';
import { addDoc } from 'firebase/firestore';
import {useAuth} from '../../../context/AuthContext';
import { ROOT_FOLDER } from '../../../hooks/useFolder';

function AddFolder({ currentFolder }) {

	const [open, setOpen] = useState(false);
	const [name, setName] = useState('');

	const {currentUser} = useAuth();

	const openModal = () => {
		setOpen(true);
	}

	const closeModal = () => {
		setOpen(false);
	}


	const onChange = (e) => {
		setName(e.target.value);
	}


	const handleSubmit = async(e) => {
		e.preventDefault();

		if(currentFolder == null) return;

		const path = [...currentFolder.path]
		if(currentFolder !== ROOT_FOLDER){
			path.push({
				name: currentFolder.name, 
				id: currentFolder.id
			})
		}

		// Create a folder in DB
		await addDoc(database.folders, {
			name: name, 
			parentId: currentFolder.id,
			userId: currentUser.uid,
			path: path,
			createdAt: database.getCurrentTimestamp()
		});

		setName('');
		closeModal();
	}



	return (
		<>
			<Button onClick={openModal} variant='outline-success' size='sm'>
				<FontAwesomeIcon icon={faFolderPlus}/>
			</Button>

			<Modal show={open} onHide={closeModal}>
				<Form onSubmit={handleSubmit}>
					<Modal.Body>
						<Form.Group>
							<Form.Label>Folder Name </Form.Label>
							<Form.Control
								type="text"
								value={name}
								onChange={onChange}
							/>
						</Form.Group>
					</Modal.Body>
					
					<Modal.Footer>
						<Button variant='secondary' onClick={closeModal} > Close</Button>
						<Button variant='success' type='submit' > Add Folder </Button>
					</Modal.Footer>
				</Form>
			</Modal>

		</>
	)
}

export default AddFolder