import { Watermark } from '@hirohe/react-watermark';


export default function PaintingModal({painting}) {

return (

<div className="ui centered grid">
    <div className="ui inverted card" style={{width: "100%", margin: "10px"}}>
        <div style={{padding: "10px"}}>
        <Watermark 
            // textColor="#FFFFFF"
            opacity={0.5}
            gutter={50}
            text="© Yasmin Mostoller">
            <div>
                <img className="ui massive image centered" src={painting.image} alt={painting.name} style={{width: "100%"}}></img>
            </div>
        </Watermark>
        </div>
    </div>
</div> 

)
}