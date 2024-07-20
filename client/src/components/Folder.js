
import { useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import EditFolder from "./EditFolder";

export default function Folder ({id, name, onDeleteFolder, onUpdateFolders}) {
    const [showEdit, setShowEdit] = useState(false);
    const [folderName, setFolderName] = useState(name)
    
    const handleDeleteFolder = (e) => {
        if (window.confirm("Are you sure you want to delete this folder?")) {
        fetch(`/folder/${id}`,{
          method:"DELETE"
        })
        .then(() => {
          onDeleteFolder(id)
        })
    }}
    
    function toggleEdit (){
        setShowEdit(prevVal => !prevVal)
    }

    return (
        <>
            <div className="card">
                <div className="content">
                    <div className="header">
                    { showEdit ? 
                        <EditFolder 
                        name={folderName} 
                        id={id} 
                        onToggleEdit={toggleEdit} 
                        setFolderName={setFolderName}
                        onUpdateFolders={onUpdateFolders}
                        /> 
                        :
                        folderName
                    } 
                    </div>
                </div>
                <div className="extra content">
                    <Button
                        icon
                        basic
                        className='ui teal button'
                        labelPosition='left'  
                        onClick={toggleEdit}
                        >
                        <Icon name='edit' />
                        Edit
                    </Button>
                    <Button
                        icon
                        basic
                        className='ui teal button'
                        labelPosition='left'  
                        onClick={handleDeleteFolder}
                        >
                        <Icon name='close' />
                        Delete
                    </Button>
                </div>
            </div>
        </>
    )

}