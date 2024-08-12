import React from "react";
import { useUser } from "../context/user";
import { useAdmin } from "../context/admin.js"
import { useDevice } from "../context/device";
import SwiperHeader from "./Swiper.js";
import headerImg from "../assets/yasi-header.jpg"
import {Link} from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";


export default function HomePage () {

return (
    <div className="ui container fluid" style={{minHeight: "90vh"}}>
        <>
            <div className="ui two column stackable grid">
                <div className="column">
                    <div className="ui left aligned text basic very padded segment">
                        <h1 style={{fontSize: "3em"}}>I'm Yasmin,</h1>
                            <h2>I believe in the power of creativity, imagination, and self-expression. 
                                Art can evoke memories, transport us to new realms of thought and feeling, and offer fresh perspectives.</h2>
                            <h2>Through my paintings, I seek to capture the moments that resonate with me, 
                                allowing imagination and emotion to shape my vibrant abstract creations.</h2>
                    </div>
                    <div className="ui center aligned grid" style={{marginBottom: "25px"}}>
                        <Link to='/paintings' className="ui massive basic circular teal button"> Explore My Paintings</Link>
                    </div>
                </div>
                <div className="column">
                {/* <SwiperHeader /> */}
                <div className="ui center aligned grid">
                    <div className="ui huge rounded image">
                        <img src={headerImg} alt="header" />
                    </div>
                </div>
                </div>
            </div>
            <h3 style={{textAlign: "center", marginTop:"75px", marginBottom: "0px"}}>
                "To draw, you must close your eyes and sing." <i> -Pablo Picasso</i></h3>

                {/* <div className="ui center aligned text container" style={{marginTop: "50px"}}>
                <Link to='/contact' className="ui massive circular right labeled basic icon teal button"><i className="mail icon"></i>Get In Touch</Link>
                </div> */}
            </>
    
        
    </div>
)
}