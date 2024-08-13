import React from "react";
import { Link } from "react-router-dom";

export default function AboutPage () {

return (
    <div className="ui centered grid" style={{minHeight:"100vh"}}>
    <div style={{width: "100%", margin: "auto", marginTop: "20px"}} className="ui card">
        <div className="image">
            <img className="ui large image" src="./images/slider2.jpg" alt="Yasmin Mostoller at the Jed William's Gallery"/>
        </div>
        <div className="content">
            <div className="header">
                Yasmin Mostoller
            </div>
            <div className="meta">
                <span className="category">Philadelphia, PA</span>
            </div>
            <div className="description" >
                    <p>
                        Persian artist Yasmin Mostoller grew up surrounded by intricate murals, mosaics, and tapestries. 
                        Later earning a Bachelor of Arts and a Masters of Fine Arts, Mostoller currently lives and works in Philadelphia, USA.
                    </p>
                    <p>
                        Yasmin's large-scale paintings eschew a monolithic approach to abstract painting, instead treating the canvas as a layered three-dimensional landscape, 
                        emphasizing movement and connectivity.  Bright, colorful, and energetic vistas bend traditional iconography into futuristic hallucinations, 
                        imagining invisible planetary forces and hybrid human cultures.
                    </p>
                    <p>
                        Her work has been shown internationally, with shows in the USA, Iran, France, Spain, India, and Germany.
                    </p>
            </div>
            <div style={{marginBottom: "25px", marginTop: "25px"}}>
                <Link to="https://www.facebook.com/yasminmostollerart" target="blank"  className="ui circular facebook icon large button" style={{marginTop: "5px", marginRight: "5px"}}>
                    <i className="facebook icon"></i>
                </Link> 
                <Link to="/contact" className="ui circular button large teal">Contact Me</Link>
                <Link to="https://www.instagram.com/yasminnunsy/" target="blank"  className="ui circular icon purple large button" style={{marginTop: "5px", marginRight: "5px"}}>
                    <i className="instagram icon"></i>
                </Link>
            </div>
        </div>
</div>
</div>


)
}