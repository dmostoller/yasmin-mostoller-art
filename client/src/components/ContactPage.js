import React from "react";
import ContactForm from "./ContactForm";


export default function ContactPage () {

return (
    <div style={{minHeight:"100vh"}}>
    <div className="ui text container" style={{textAlign: "center", marginTop: "150px"}}>
        <h1 className="header">Get In Touch</h1>
        <h3>Purchase a painting or commission a custom work.</h3>    
            <p>
                If you are interested in purchasing any of the paintings shown here, or if you would like to commission a custom work, I would be happy to discuss this with you. Please fill out the form below with as much information as possible, and I will get back to you as soon as I can. Thank you very much.
            </p>
    </div>
    <div className="ui text container" >        
        <ContactForm />
    </div>
    </div>
)
}