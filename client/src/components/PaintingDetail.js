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
            <div className="ui horizontal card fluid">

                <div className="item">
                    <div className="image">
                    <Watermark 
                        // textColor="#FFFFFF"
                        opacity={0.5}
                        gutter={20}
                        text="© Yasmin Mostoller">
                        <div>
                        <img className="ui large image" 
                            src={painting.image} 
                            alt={painting.title} 
                            onClick={handleOpen} 
                            style={{borderRadius:"5px"}}>
                            </img>
                        </div>
                    </Watermark>
                        <Modal
                            open={modalOpen}
                            onClose={handleClose}
                            basic={true}
                            >
                            <PaintingModal painting={painting}/>
                        </Modal>
                    </div>
                </div>
                <div className="content" style={{padding: "25px"}}>
                    {/* <div class="right floated meta">
                        <div className="ui teal message">
                            <div className="header">
                            <i className="folder icon"></i>
                            {painting.folder.name}
                            </div>
                        </div>
                    </div> */}

                    
                        <div className="header"><h2>{painting.title}</h2></div>
                        <div className="description">{painting.materials}</div>
                        <div className="description">{painting.width}" x {painting.height}"</div>
                        <div className="description">
                            {painting.sold ? "SOLD" : <Link to="/contact">${painting.sale_price}</Link>}
                        </div>
                        <div style={{marginTop:"5px", padding: "10px"}} className="ui grid"> 
                            <Link to="/paintings" className="ui circular icon button large teal" >
                            <i className="undo icon"></i></Link>
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

                </div>
                { isAdmin || !painting.sold &&
                    <div className="extra content">
                    { isAdmin &&
                        <div className="left floated author">
                        <button 
                            className="circular ui icon button labeled large teal"
                            data-inverted="" data-tooltip="Download Painting" data-position="bottom center"
                            onClick={() => {
                                handleDownload(
                                    `${painting.image}`,
                                    `${painting.title}.jpg`
                                    );
                            }}>Download
                            <i className="arrow circle down icon"></i>
                        </button>
                        </div>
                        }
                        { !painting.sold && 
                        <div className="right floated author">
                            <Link to='/contact' className="ui circular teal labeled icon large button">
                            <i className="shopping cart icon"></i>
                            Purchase Inquiry
                            </Link>
                        </div>
                        }
                    </div>
            }
                    
            </div> 
            <div className="ui segment">
                    <div><CommentsList user={user} painting_id={painting.id}/></div>          
            </div>
        </div>
    );
}

export default PaintingDetail