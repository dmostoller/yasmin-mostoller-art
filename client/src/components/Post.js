import React from "react";
import {Link } from "react-router-dom";


export default function Post ({id, title, content, image_url, date_added}) {
    return (
        <div className="ui container fluid">
            <Link to={`/posts/${id}`} className="ui horizontal card fluid" style={{marginBottom: "15px"}}>
                <div className="image" style={{minWidth: "300px"}}>
                    <img src={image_url} alt={title} style={{minWidth: "300px"}}></img>
                </div>
                <div className="content" style={{padding: "25px"}}>
                    <div className="header">{title}</div>
                    <div className="meta">{date_added}</div> 
                    <div className="description">{content}</div>
                    {/* <div style={{paddingTop: "25px", float: "left"}}> 
                        <Link to={`/posts/${id}`}  className="ui circular button small teal">Read More</Link>
                    </div> */}
                    {/* { isAdmin ? (
                        <div style={{paddingTop: "25px", float: "left"}}> 
                            <button className="ui icon button small teal" onClick={handleDeletePost}>
                            <i class="trash icon" style={{visibility: "visible"}}></i>
                            </button>
                        </div>
                    )
                    : <></>    
                } */}
                </div>
            </Link>
        </div>
    );
}
