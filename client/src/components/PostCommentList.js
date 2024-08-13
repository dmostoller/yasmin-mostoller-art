import React, {useEffect, useState} from "react";
import PostComment from "./PostComment";
import PostCommentForm from "./PostCommentForm";
import { Link } from "react-router-dom";

function PostCommentsList({user, post_id}){
    const [comments, setComments] = useState([])
    const [isComFormVis, setIsComFormVis] = useState(false)
    function changeIsComFormVis() {
        setIsComFormVis(!isComFormVis)
    }

    useEffect(() => {
        fetch(`/post_comments`)
       .then((res) => res.json())
       .then((comments) => setComments(comments))
    }, []);

    const deleteComment = (deleted_comment_id) => {
        setComments(comments => comments.filter((comment) => comment.id !== deleted_comment_id))
        // console.log(deleted_comment_id)
    }

    const commentsSection = comments
    .filter(comment => comment.post_id === post_id)
    .map(comment => (
        <PostComment 
            key={comment.id} 
            id={comment.id} 
            username={comment.user.username} 
            comment={comment.comment}
            date_added={comment.date_added} 
            comment_user_id={comment.user_id}
            user={user}
            onDeleteComment={deleteComment}
        />
        ))

    const addComment = (newComment) =>{
        setComments([...comments, newComment])
    }
    
    return (
        <div className="ui text container">
            <h3 style={{paddingTop: "15px"}}className="ui dividing header">Comments</h3>  
            {commentsSection}
            {user ? 
            <div style={{paddingBottom: "25px", paddingTop: "10px"}}>
                {isComFormVis ? <PostCommentForm user={user} onAddComment={addComment} postId={post_id} onChangeIsComFormVis={changeIsComFormVis} />
                 : 
                 <div 
                    onClick={changeIsComFormVis} 
                    className="ui circular fluid animated fade basic button teal tiny" tabindex="0">
                    <div className="visible content"><i className="plus icon"></i></div>
                    <div className="hidden content">
                        New Comment
                    </div>   
                 </div>
                 }
            </div>
            : 
            <div className="ui centered grid" style={{padding: "5px"}}>
                <div className="ui message">
                <span className="ui small text">
                    Please <Link to='/login'>Login</Link> or <Link to='/signup'>Create an Account</Link> to leave a comment
                </span>
                </div>
            </div>

            }
        </div>
    );
}

export default PostCommentsList