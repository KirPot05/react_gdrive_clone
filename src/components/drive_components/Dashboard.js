import React from "react";
import { Container } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";
import { useFolder } from "../../hooks/useFolder";
import AddFile from "./Buttons/AddFile";
import AddFolder from "./Buttons/AddFolder";
import Folder from "./Folder";
import FolderBreadcrumbs from "./FolderBreadcrumbs";
import NavbarComponent from "./NavbarComponent";
import File from "./File";

function Dashboard() {
  const { folderId } = useParams();
  let { state } = useLocation();

  if (state == null) {
    state = {};
  }

  const { folder, childFolders, childFiles } = useFolder(folderId, state.folder);

  return (
    <>
      <NavbarComponent />

      <Container className="my-2" fluid>
        <div className="d-flex align-items-center">
          <FolderBreadcrumbs currentFolder={folder} />
          <AddFile currentFolder={folder} />
          <AddFolder currentFolder={folder} />
        </div>

        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map((childFolder) => {
              return (
                <div
                  className="p-2"
                  style={{ maxWidth: "250px" }}
                  key={childFolder.id}
                >
                  <Folder folder={childFolder} />
                </div>
              );
            })}
          </div>
        )}

        {childFolders.length > 0  &&  childFiles.length > 0  &&  <hr/>}

        
        {childFiles.length > 0 &&  (
          <div className="d-flex flex-wrap">
            {childFiles.map((childFile) => {
              return (
                <div
                  className="p-2"
                  style={{ maxWidth: "250px" }}
                  key={childFile.id}
                >
                  <File file={childFile} />
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </>
  );
}

export default Dashboard;
