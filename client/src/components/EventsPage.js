import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/user";
import { useAdmin } from "../context/admin.js"
import Event from "./Event.js";


function EventsPage () {
    const [events, setEvents] = useState([])
    const { user } = useUser()
    const { isAdmin } = useAdmin()

    useEffect(() => {
      fetch(`/event`)
      .then((res) => res.json())
      .then((events) => {setEvents(events)})
    }, []);

    const deleteEvent = (deleted_event_id) => {
        setEvents(events => events.filter((event) => event.id !== deleted_event_id))
    }
    const sortedEvents = events.sort((a, b) => (a.event_date) > (b.event_date) ? -1 :1)

    const gallery = sortedEvents.map((event) => {
        return <Event 
        key={event.id}
        id={event.id} 
        name={event.name}
        location={event.location}
        venue={event.venue}
        details={event.details}
        image_url={event.image_url}
        event_date={event.event_date}
        event_link={event.event_link}
        isAdmin={isAdmin}
        onDeleteEvent={deleteEvent}
        />
    })

    return (
        <div className="ui container" style={{minHeight:"100vh"}}>
            {(user && isAdmin) &&  
                <div style={{marginBottom:  "20px", textAlign: "right"}} className="ui container">     
                    <Link to={`/events/new`} className="ui animated fade circular icon button teal fluid" tabindex="0">
                            <div className="visible content"><i className="plus icon"></i></div>
                            <div className="hidden content">
                                Create New Event
                            </div> 
                        </Link>
                </div>
            }
            <div className="ui container" style={{paddingTop:"5px"}}>
                <div className="ui grid">{gallery}</div> 
            </div>
        </div>
    )
}

export default EventsPage