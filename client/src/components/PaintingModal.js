import React from "react"


export default function PaintingModal({painting}) {

return (

<div className="ui centered grid">
    <div className="ui inverted card" style={{width: "100%", margin: "10px"}}>
        <div style={{padding: "10px"}}>
            <img className="ui massive image centered" src={painting.image} alt={painting.name} style={{width: "100%"}}></img>
        </div>
    </div>
</div> 

)
}