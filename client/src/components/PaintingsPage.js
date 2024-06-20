import React, {useState, useEffect} from "react";
import PaintingsList from "./PaintingsList";
import Search from "./Search";
import { Link } from "react-router-dom";
import { useUser } from "../context/user";
import { useAdmin } from "../context/admin.js"

function PaintingsPage () {
    const { user } = useUser()
    const { isAdmin } = useAdmin()
    const [paintings, setPaintings] = useState([])
    const [searchQ, setSearchQ] = useState("")
    const [sortBy, setSortBy] = useState("Default")
    const [forSale, setForSale] = useState(false)


    useEffect(() => {
      fetch(`/painting`)
      .then((res) => res.json())
      .then((paintings) => {setPaintings(paintings)})
    }, []);

    const results = paintings
    .filter(painting => {
        return (
            painting.title.toLowerCase().includes(searchQ.toLowerCase())        
        )
    })
    const searchResults = results
    .filter(painting => {
        if (forSale == true) {
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

    const handleSortBy = (e) => {
        setSortBy(e.target.value)
    }

    return (
        <div className="ui container fluid">
            <div className="ui container fluid">
                <Search searchQ={searchQ} onSearch={setSearchQ} selected={sortBy} sortBy={handleSortBy} forSale={forSale} setForSale={setForSale}/>
                {(user && isAdmin) &&
                    <div style={{paddingTop: "20px"}} className="ui container">   
                        <Link to="/paintings/new" className="ui circular animated fade icon button teal fluid small" tabindex="0">
                            <div className="visible content"><i className="plus icon"></i></div>
                            <div className="hidden content">
                                Create New Painting
                            </div> 
                        </Link>
                    </div>
                }
            </div>
            <div className="ui container centered" style={{paddingTop:"50px"}}>
                <PaintingsList paintings={searchResults}/>
            </div>
        </div>
    )
}

export default PaintingsPage