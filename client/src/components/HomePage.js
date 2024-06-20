import React from "react";
import Slider from './Slider.js';
import PostsList from "./PostsList.js";
import { useUser } from "../context/user";
import { useAdmin } from "../context/admin.js"

export default function HomePage () {
    const { user } = useUser()
    const { isAdmin } = useAdmin()
return (
    <div className="ui container fluid">
        <div className="ui container fluid" style={{textAlign: "center"}}>
            <Slider />
        </div>
        <p style={{textAlign: "center", marginTop:"15px", marginBottom: "0px"}}>"To draw, you must close your eyes and sing." <i> -Pablo Picasso</i></p>
        <div className="ui container fluid"><PostsList user={user} isAdmin={isAdmin}/></div>
    </div>
)
}