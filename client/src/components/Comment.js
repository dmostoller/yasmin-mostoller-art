import React from "react";

function Comment({username, comment,key, id, date_added, comment_user_id, user, onDeleteComment}){

    const handleDeleteComment = (e) => {
        fetch(`/comment/${id}`,{
          method:"DELETE"
        })
        .then(() => {
          onDeleteComment(id)
        })
    }

    return (
        <div key={key} className="ui comments">
            <div className="comment">
                <div className="content">
                <div className="author">{username}<div className="metadata"><span className="date">{date_added}</span></div></div>
                <div className="text">{comment}</div>

            {user && user.id === comment_user_id ? 
                <div className="actions">
                <a onClick={handleDeleteComment} className="delete">Delete</a>
            </div>
            : <></>
            }
   
            </div>
        </div>
        </div>
    )
}

export default Comment