import React, {useState, useEffect} from "react";
import PaintingsList from "./PaintingsList";
import Search from "./Search";
import { Link } from "react-router-dom";
import { useUser } from "../context/user";
import { useAdmin } from "../context/admin.js"
import { Button, Icon } from "semantic-ui-react";
import AddFolder from "./AddFolder.js";
import SEO from './SEO.js';


function PaintingsPage () {
    const { user } = useUser()
    const { isAdmin } = useAdmin()
    const [paintings, setPaintings] = useState([])
    const [searchQ, setSearchQ] = useState("")
    const [sortBy, setSortBy] = useState("Default")
    const [forSale, setForSale] = useState(false)
    const [showFolderInput, setShowFolderInput] = useState(false);
    const [folders, setFolders] = useState([])
    const [selectedFolder, setSelectedFolder] = useState("none")

    function toggleFolderInput() {
        setShowFolderInput(prevVal => !prevVal)
    }

    useEffect(() => {
      fetch(`/painting`)
      .then((res) => res.json())
      .then((paintings) => {setPaintings(paintings)})
    }, []);

    useEffect(() => {
        fetch(`/folder`)
        .then((res) => res.json())
        .then((folders) => {setFolders(folders)})
      }, []);


    const results = paintings
    .filter(painting => {
        return (
            painting.title.toLowerCase().includes(searchQ.toLowerCase())        
        )
    })
    const searchResults = results
    .filter(painting => {
        if (forSale === true) {
        return (
            painting.sold !== true
        )
    } else {
        return (
            painting
        )
    }
    })



    if (sortBy === "Small"){
        (searchResults.sort((a, b) => (a.width*a.height) < (b.width*b.height) ? -1 : 1))
    } else if (sortBy === "Large"){
       (searchResults.sort((a, b) => (a.width*a.height) > (b.width*b.height) ? -1 : 1))
    } else if (sortBy === "Low"){
        (searchResults.sort((a, b) => (a.sale_price) < (b.sale_price) ? -1 : 1))
    } else if (sortBy === "High") {
        (searchResults.sort((a, b) => (a.sale_price) > (b.sale_price) ? -1 : 1))
    }

    const folderResults = searchResults.filter(painting => {
        if (selectedFolder !== "none") {
            if (painting.folder_id === parseInt(selectedFolder, 10)) {
                console.log(painting.folder_id);
                return true;  // Return true to include this painting in the filtered results
            }
            return false;  // Return false to exclude this painting
        } else {
            return true;  // Return true to include this painting when no folder is selected
        }
    });

    const addFolder = (newFolder) =>{
        setFolders([...folders, newFolder])
    }
    

    const handleSortBy = (e) => {
        setSortBy(e.target.value)
    }

    const handleSelectedFolder = (e) => {
        setSelectedFolder(e.target.value)
        // console.log(e.target.value)
    }    

    return (
        <div className="ui container fluid" style={{minHeight:"100vh"}}>
            <SEO
            title="Yasmin Mostoller | Paintings"
            description="Imagination and Emotion"
            name="Yasmin Mostoller"
            type="website"
            image="https://yasminmostoller.com/images/slider2.jpg"
            url="https://yasminmostoller.com/paintings"
            />
            <div className="ui container fluid" style={{marginTop: "110px"}}>
                <Search 
                    searchQ={searchQ} onSearch={setSearchQ} 
                    selected={sortBy} sortBy={handleSortBy} 
                    forSale={forSale} setForSale={setForSale}
                    folders={folders}
                    selectedFolder={selectedFolder} setSelectedFolder={handleSelectedFolder}
                    />
                {(user && isAdmin) &&
                    <div style={{paddingTop: "20px"}} className="ui centered grid"> 
                        <Link to="/paintings/new" className="ui circular labeled icon button large teal">
                            <i className="plus icon"></i>Add Painting
                        </Link>
         
                        {showFolderInput ?
                            <AddFolder onToggleFolder={toggleFolderInput} onAddFolder={addFolder}/>
                        :
                            <Button
                                icon
                                className='ui circular teal large button'
                                labelPosition='left'  
                                onClick={toggleFolderInput}>
                                <Icon name='folder' />
                                Create Folder
                            </Button>
                        }
                      
                    </div>
                }
            </div>
            <div className="ui container centered" style={{paddingTop:"50px"}}>
                <PaintingsList paintings={folderResults}/>
            </div>
        </div>
    )
}

export default PaintingsPage