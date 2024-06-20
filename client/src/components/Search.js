import React from "react";
import { Radio } from 'semantic-ui-react'


function Search({searchQ, onSearch, sortBy, selected, forSale, setForSale}) {

    function toggleForSale() {
        setForSale(!forSale)
    }

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
                style={{padding: "5px"}}
                value={selected} // ...force the select's value to match the state variable...
                onChange={sortBy}>
                <option value="Default">Sort by: ---------- </option>
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