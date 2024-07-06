import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import { useUser } from "../context/user";
import { useAdmin } from "../context/admin.js"
import { Modal } from "semantic-ui-react";
import PostModal from "./PostModal.js";
import PostCommentsList from "./PostCommentList.js";
import VideoPlayer from "./VideoPlayer";
import { useDevice } from "../context/device";

function PostDetail(){
    const { user } = useUser()
    const { isAdmin } = useAdmin()
    const {deviceSize} = useDevice();
    const [post, setPost] = useState({})
    const {id} = useParams();
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [videoUrl, setVideoUrl] = useState();
    const [imageUrl, setImageUrl] = useState();



    function handleOpen() {
        setModalOpen(true)
    } 

    function handleClose() {
        setModalOpen(false)
    } 

    useEffect(() => {
        fetch(`/post/${id}`)
        .then((res) => res.json())
        .then((post) => {
            setPost(post)
            setImageUrl(post.image_url)
            setVideoUrl(post.video_url)
          })
      }, [id]);


    const handleDeletePost = (e) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
        fetch(`/post/${id}`, {
            method: "DELETE"
            })
            .then(() => {
                // deletePost(post)
                navigate('/') 
            })
        }
    }
    
    // console.log(videoUrl)

    return (
        <div className="ui container" style={{minHeight:"100vh"}}>
            <div style={{width: "100%", margin: "auto"}} className="ui centered card">
                {(post.image_url !== "undefined") && (post.image_url !== null) && (post.image_url !== "null") && 
                    <div className="image">
                        <img src={post.image_url} 
                        onClick={handleOpen}  
                        alt={post.title}>
                        </img>
                        <Modal
                            open={modalOpen}
                            onClose={handleClose}
                            basic={true}
                            >
                            <PostModal image={post.image_url} title={post.title}/>
                        </Modal>
                    </div>
                }
                {(videoUrl !== "undefined") && (videoUrl !== null) && (videoUrl !== "null") && (videoUrl !== undefined) && 
                    <div className="image">
                            <VideoPlayer videoUrl={videoUrl} />
                    </div>
                }
                <div className="content">
                    <div className="header">
                        {post.title}
                    </div>
                    <div className="meta">
                        <span className="category">{post.date_added}</span>
                    </div>
                    <div className="description">
                        <p>{post.content}</p>
                    </div>
                    <div style={{padding: "10px"}}> 
                        <Link to="/" className="ui circular icon button small teal">
                        <i className="undo icon"></i>
                        </Link>
                        { user && isAdmin && (
                                        <>
                                            <Link to={`/posts/${id}/edit`} className="ui circular icon button small teal">
                                                <i className="edit icon"></i>
                                            </Link>
                                            <div className="ui circular icon button small teal" onClick={handleDeletePost}>
                                                <i className="trash icon" style={{visibility: "visible"}}></i>
                                            </div>
                                        </>
                                        )   
                                    }
                    </div>
                </div>
            </div>
            <div className="ui segment">
                    <div><PostCommentsList user={user} post_id={post.id}/></div>          
            </div>
        </div>
        
        );
}

export default PostDetail