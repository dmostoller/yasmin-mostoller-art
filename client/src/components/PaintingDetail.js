import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Link, useNavigate} from "react-router-dom";
import CommentsList from "./CommentsList";
import { useUser } from "../context/user";
import { useAdmin } from "../context/admin.js"
import { Modal } from "semantic-ui-react";
import PaintingModal from "./PaintingModal";

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
    return (
        <div className="ui container">
            <div className="ui horizontal card fluid">
                <div className="item">
                    <div className="image">
                        <img className="ui large image" 
                        src={painting.image} 
                        alt={painting.title} 
                        onClick={handleOpen} 
                        style={{borderRadius:"5px"}}>
                        </img>
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
                        <div className="header"><h2>{painting.title}</h2></div>
                        <div className="description">{painting.materials}</div>
                        <div className="description">{painting.width}" x {painting.height}"</div>
                        <div className="description">
                            {painting.sold ? "SOLD" : <Link to="/contact">${painting.sale_price}</Link>}
                        </div>
                        <div style={{marginTop:"5px", padding: "10px"}} className="ui grid"> 
                            <Link to="/paintings" className="ui circular icon button small teal" >
                            <i className="undo icon"></i></Link>
                            { isAdmin && (
                                <>
                                    <Link to={`/paintings/${id}/edit`} className="ui circular icon button small teal">
                                        <i className="edit icon"></i>
                                    </Link>
                                    <div className="ui circular icon button small teal" onClick={handleDeletePainting}>
                                        <i class="trash icon"></i>
                                    </div>
                                </>
                                )   
                            }
                        </div>
                </div>
            </div> 
            <div className="ui segment">
                    <div><CommentsList user={user} painting_id={painting.id}/></div>          
            </div>
        </div>
    );
}

export default PaintingDetail