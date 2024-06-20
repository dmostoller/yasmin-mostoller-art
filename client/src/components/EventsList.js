import React from "react";
import Event from "./Event";

function EventsList ({events, isAdmin, deleteEvent}) {
    const gallery = events.map((event) => {
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
        deleteEvent={deleteEvent}
        />
    })
    return (
        <div className="ui grid">{gallery}</div> 
    )
}

export default EventsList