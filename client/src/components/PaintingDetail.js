import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Link, useNavigate} from "react-router-dom";
import CommentsList from "./CommentsList";
import { useUser } from "../context/user";
import { useAdmin } from "../context/admin.js"
import { Modal } from "semantic-ui-react";
import PaintingModal from "./PaintingModal";
import { Watermark } from '@hirohe/react-watermark';
import axios from "axios";
import fileDownload from "js-file-download"




function PaintingDetail(){
    const { user } = useUser()
    const { isAdmin } = useAdmin()
    const [painting, setPainting] = useState({})
    const {id} = useParams();
    const navigate = useNavigate()
    const [modalOpen, setModalOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    function handleOpen() {
        setModalOpen(true)
    } 

    function handleClose() {
        setModalOpen(false)
    } 
    
    useEffect(() => {
        fetch(`/painting/${id}`)
        .then((res) => res.json())
        .then((painting) => setPainting(painting))
    }, [id]);

    // console.log(painting.image)

    const handleDeletePainting = (e) => {
        if (window.confirm("Are you sure you want to delete this painting?")) {
        fetch(`/painting/${id}`, {
            method: "DELETE"
            })
            .then(() => {
                navigate('/paintings') 
            })
        }
    }   

    const handleDownload = (url, filename) => {
        axios
          .get(url, {
            responseType: "blob"
          })
          .then((res) => {
            fileDownload(res.data, filename);
          });
      };


    return (
        <div className="ui container">
            <div className="ui horizontal card fluid" style={{marginTop: "100px"}}>

                <div className="item">
                    <div className="image">
                    {/* <Watermark 
                        // textColor="#FFFFFF"
                        opacity={0.5}
                        gutter={20}
                        text="© Yasmin Mostoller"> */}
                        <div>
                        <img className="ui large image" 
                            src={painting.image} 
                            alt={painting.title} 
                            onClick={handleOpen} 
                            style={{borderRadius:"5px"}}>
                            </img>
                        </div>
                    {/* </Watermark> */}
                        <Modal
                            open={modalOpen}
                            onClose={handleClose}
                            dimmer='inverted'
                            basic={true}
                            >
                            <PaintingModal painting={painting}/>
                        </Modal>
                    </div>
                </div>
                <div className="content" style={{padding: "25px"}}>
                    <div class="right floated meta">
                            { isAdmin &&
                            <button 
                                className="ui circular icon button large teal"
                                data-inverted="" data-tooltip="Download Painting" data-position="bottom center"
                                onClick={() => {
                                    handleDownload(
                                        `${painting.image}`,
                                        `${painting.title}.jpg`
                                        );
                                }}>
                                <i className="download icon"></i>
                            </button>
                            }
                             { !painting.sold && !isAdmin &&
                            <div className="right floated author">
                                <Link to='/contact' className="ui teal right floated basic icon large button">
                                
                                Purchase Inquiry
                                </Link>
                            </div>
                            }
                    </div>

                    
                        <div className="header"><h2>{painting.title}</h2></div>
                        <div className="description">{painting.materials}</div>
                        <div className="description">{painting.width}" x {painting.height}"</div>
                        <div className="description">
                            {painting.sold ? "SOLD" : <Link to="/contact">${painting.sale_price}</Link>}
                        </div>
                        <div style={{marginTop:"5px", padding: "10px"}} className="ui grid"> 
                            {/* <Link to="/paintings" className="ui circular icon button large teal" >
                            <i className="undo icon"></i></Link> */}
                            { isAdmin && (
                                <>
                                    <Link to={`/paintings/${id}/edit`} className="ui circular icon button large teal">
                                        <i className="edit icon"></i>
                                    </Link>

                                    <div className="ui circular icon button large teal" onClick={handleDeletePainting}>
                                        <i class="trash icon"></i>
                                    </div>
                                </>
                                )   
                            }
                        </div>
                        <div>
                    
                   
                </div>
                </div>
               
                    
            </div> 
            
 
            
                {isOpen ?
                <div className="ui segment">
                    
                    <div>
                        <div className="ui left floated vertical animated fade basic teal button" onClick={() => setIsOpen(false)} tabindex="0">
                            <div className="hidden content"> Hide </div>
                            <div className="visible content">
                                <i className="ui angle double up icon"></i> 
                            </div>
                        </div>
                    </div>
                    <div>
                        <CommentsList user={user} painting_id={painting.id}/>
                    </div>    
                </div>

                    :
                    <div>
                        <div className="ui vertical animated basic teal button" onClick={() => setIsOpen(true)} tabindex="0">
                            <div className="hidden content"> Comment </div>
                            <div className="visible content">
                                <i className="ui large angle double down icon"></i> 
                            </div>
                        </div>
                    </div>
                }      
            
        </div>
    );
}

export default PaintingDetail