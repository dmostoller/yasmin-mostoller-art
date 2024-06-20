import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import { useUser } from "../context/user";
import { useAdmin } from "../context/admin.js"

function EventDetail(){
    const [event, setEvent] = useState({})
    const {id} = useParams();
    const navigate = useNavigate();
    const { user } = useUser()
    const { isAdmin } = useAdmin()

    useEffect(() => {
        fetch(`/events/${id}`)
        .then((res) => res.json())
        .then((event) => setEvent(event))
    }, [id]);

    const handleDeleteEvent = (event) => {
        if (window.confirm("Are you sure you want to delete this event?")) {
        fetch(`/event/${id}`, {
            method: "DELETE"
            })
            .then(() => {
                navigate('/events') 
            })
        }
    }    

    return (
        <div className="ui container" style={{minHeight:"100vh"}}>
        <div style={{width: "600px", margin: "auto"}} className="ui card">
            <div className="image">
                <img className="ui huge image" src={event.image_url} alt={event.name}></img>
            </div>
            <div className="content">
                <div className="header">
                    {event.name}
                </div>
                <div className="meta">
                    <span className="category">{event.event_date}</span>
                </div>
                <div className="description">
                    <p>{event.venue}</p>
                </div>
                <div className="description">
                    <p>{event.location}</p>
                </div>
                <div className="description">
                    <p>{event.details}</p>
                </div>
                <div style={{padding: "10px"}}> 
                    <Link to="/events" className="ui circular button small teal">Back</Link>
                    <a href={event.event_link} className="ui circular button small teal" target="_blank" rel="noopener noreferrer">Go To Event</a>
                    { user && isAdmin ? (
                        <>
                        <div style={{float: "right"}} className="ui buttons">
                            <Link to={`/events/${id}/edit`} className="ui circular icon button small teal">
                                <i className="edit icon"></i>
                                Edit
                            </Link>
                            <div class="or"></div>
                            <div className="ui circular icon button small teal" onClick={handleDeleteEvent}>
                                <i class="trash icon" style={{visibility: "visible"}}></i>
                                Delete
                            </div>
                        </div>
                        </>
                        )
                        : <></>    
                    }
                </div>
            </div>
    </div>
    </div>
    
    );
}

export default EventDetail