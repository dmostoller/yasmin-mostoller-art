import React, { useState, useEffect } from "react";
import { useUser } from "../context/user";
import EditUser from "./EditUser";
import Folder from "./Folder";
import AddFolder from "./AddFolder";
import { Button, Icon } from "semantic-ui-react";
import {Link} from "react-router-dom";


export default function User () {
    const [showEdit, setShowEdit] = useState(false);
    const {user} = useUser();
    // const {folders, setFolders} = useFolders()
    const [folders, setFolders] = useState([])


    const [showFolderInput, setShowFolderInput] = useState(false);

    
    function toggleFolderInput() {
        setShowFolderInput(prevVal => !prevVal)
    }

    function showEditForm() {
        setShowEdit(!showEdit)
    }

    useEffect(() => {
        fetch(`/folder`)
        .then((res) => res.json())
        .then((folders) => {setFolders(folders)})
      }, []);

    const deleteFolder = (deleted_folder_id) => {
        setFolders(folders => folders.filter((folder) => folder.id !== deleted_folder_id))
        // console.log(deleted_comment_id)
    }

    const updateFolders = (updated_folder_id, updatedFolder) => {
        setFolders(folders => folders
            .filter((folder) => folder.id !== updated_folder_id)
            .concat(updatedFolder)
        )
    }

    const addFolder = (newFolder) =>{
        setFolders([...folders, newFolder])
    }

    const foldersList = folders.map((folder) => {
        return (
            <Folder 
                onDeleteFolder={deleteFolder}
                key={folder.id}
                id={folder.id}
                name={folder.name}
                onUpdateFolders={updateFolders}
                />
        )
    })

    return (
        <div className="ui middle aligned center aligned grid" style={{minHeight:"100vh"}}>
            {showEdit ? 
            <EditUser setShowEdit={showEditForm}/> 
            :
            <div className="ui container" style={{marginTop: "50px"}}>
                <h4 className="ui horizontal divider">My Account</h4>
                <div className="ui centered grid">
                    <div className="ui card" style={{margin: "25px"}}>
                        <div className="content" style={{padding: "25px"}}>
                            <div className="header">{user.username}</div>
                            <div className="description">{user.email}</div>
                            <div style={{paddingTop: "25px"}}> 
                                <button onClick={showEditForm} className="ui circular button small teal">Edit User</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ui centered padded grid">
                <Link target='_blank' to='https://analytics.google.com/analytics/web/?authuser=1#/p451159949/reports/intelligenthome'
                    className='ui large teal labeled icon button'
                >
                <i className="chartline icon"></i>
                Google Analytics
                </Link>
            </div>
            </div>
            }

        <div className="ui container">
            <h4 className="ui horizontal divider">Folders</h4>
            <div className="ui centered grid" style={{marginTop: "25x"}}>
            <div className="ui padded basic segment">
            {showFolderInput ?
                    <AddFolder onToggleFolder={toggleFolderInput} onAddFolder={addFolder}/>
                :
                    <Button
                        icon
                        className='ui teal button'
                        labelPosition='left'  
                        onClick={toggleFolderInput}>
                        <Icon name='folder' />
                        Create New Folder
                    </Button>
                }
                </div>
                <div className="ui centered cards">
                    {foldersList}
                </div>
            </div>
        </div>
    </div>
    );
}
