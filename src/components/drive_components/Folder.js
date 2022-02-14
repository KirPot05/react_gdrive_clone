import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function Folder({ folder }){


  return (
      <Button 
    		to={{
				pathname :`/folder/${folder.id}`,
        state: {folder: folder}
			}} 
      
        	variant="outline-dark" 
        	className="text-truncate w-100" 
        	as={Link} 
      >
        <FontAwesomeIcon icon={faFolder} className="mx-2"/>
        {folder.name}
    </Button>
  )
}

export default Folder