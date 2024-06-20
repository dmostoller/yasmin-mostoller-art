import React from "react";
import {Link} from "react-router-dom";

export default function Painting ({image, title, sold, width, height, materials, price, id}) {

    return (

            <Link to={`/paintings/${id}`} className="ui centered card" style={{marginBottom: "15px"}}>
                <div className="image">
                    <img src={image} alt={title}></img>
                </div>
                <div className="content">
                    <div className="header">{title}</div>
                    <div className="description">{materials}</div>
                    <div className="description">{width}" x {height}"</div>                
                    <div className="description">
                        {sold ? "SOLD" : <Link to="/contact">{price}</Link>}
                    </div>
                </div>
            </Link>
    );
}
