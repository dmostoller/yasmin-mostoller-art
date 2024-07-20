import React from "react";
import { Radio } from 'semantic-ui-react'
import { useFolders } from "../context/folder";


function Search({searchQ, onSearch, sortBy, selected, forSale, setForSale, selectedFolder, setSelectedFolder}) {
    const {folders, setFolders} = useFolders()
    function toggleForSale() {
        setForSale(!forSale)
    }
    // console.log(folders)
    const folderList = folders.map((folder) => {
        return (
            <option className='item' value={folder.id}><button className="ui circular icon button small inverted"><i className="close icon"></i></button>{folder.name}</option>
        )
    })

    return (
        <div className="ui centered grid">
            <span>
            <div className="ui icon input " style={{marginBottom: "5px"}}>
                <input 
                type="text"
                value={searchQ}
                placeholder="Search..."
                onChange={(e) => onSearch(e.target.value)}
                />
                <i className="search icon"></i>
            </div>
            </span>
            <span>            
            <select className="ui selection dropdown"
                style={{padding: "5px", marginBottom: "5px"}}
                name="folder"
                value={selectedFolder} // ...force the select's value to match the state variable...
                onChange={setSelectedFolder}
                >
                    <option value="none">Select Folder: </option>
                {folderList}
            </select>
            </span>
            <span>            
            <select className="ui selection dropdown"
                style={{padding: "5px"}}
                name="sort"
                value={selected} // ...force the select's value to match the state variable...
                onChange={sortBy}>
                <option value="Default">Sort by: </option>
                <option value="Small">Size: Small - Large</option>
                <option value="Large">Size: Large - Small</option>
                <option value="Low">Price: Low - High</option>
                <option value="High">Price: High - Low</option>
            </select>
            </span>
            <span>
                <Radio toggle label="For Sale" 
                onChange={toggleForSale} 
                style={{padding: "0.5em"}}
                /> 
            </span>
        </div>
    )
}
export default Search