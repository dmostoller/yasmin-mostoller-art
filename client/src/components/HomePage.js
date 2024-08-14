import React from "react";

import headerImg from "../assets/yasi-header.jpg"
import {Link} from "react-router-dom";
import SEO from './SEO.js';


export default function HomePage () {

return (
    <div className="ui container fluid" style={{minHeight: "90vh"}}>
        <SEO
            title="Yasmin Mostoller | Abstract Artist"
            description="Imagination and Emotion"
            name="Yasmin Mostoller"
            type="website"
            image="https://yasminmostoller.com/images/slider2.jpg"
            url="https://yasminmostoller.com/"
            />
        <>
            <div className="ui two column stackable grid" style={{marginTop: "100px"}}>
                <div className="column">
                    <div className="ui left aligned text basic very padded segment" style={{marginTop: "25px"}}>
                        <h1 style={{fontSize: "3em"}}>I'm Yasmin,</h1>
                            <h1>I believe in the power of painting to evoke memories and transport us to new realms of thought and feeling.  
                                Imagination and emotion shape my vibrant approach to abstract painting.</h1>
                    </div>
                    <div className="ui center aligned grid" style={{marginBottom: "25px"}}>
                        <Link to='/gallery' className="ui massive basic circular teal button"> Explore My Paintings</Link>
                    </div>
                </div>
                <div className="column">
                <div className="ui center aligned grid">
                    <div className="ui huge rounded image">
                        <img src={headerImg} alt="header" />
                    </div>
                    <h3 style={{textAlign: "center", marginTop:"25px", marginBottom: "0px"}}>
                "To draw, you must close your eyes and sing." <br></br><i> -Pablo Picasso</i>
            </h3>
                </div>
                </div>
            </div>

        </>
    
        
    </div>
)
}