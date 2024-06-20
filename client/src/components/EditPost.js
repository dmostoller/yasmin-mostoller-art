import React, {useState, useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import UploadWidget from "./UploadWidget";
import UploadVideoWidget from "./UploadVideoWidget";
import VideoPlayer from "./VideoPlayer";

function EditPost() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [post, setPost] = useState({})
    const {id} = useParams();
    const [imageUrl, setImageUrl] = useState();
    const [videoUrl, setVideoUrl] = useState();



    useEffect(() => {
      fetch(`/post/${id}`)
      .then((res) => res.json())
      .then((post) => {
        setPost(post)
        setImageUrl(post.image_url)
        setVideoUrl(post.video_url)
      })
  }, [id]);

    const formSchema = yup.object().shape({
        title: yup.string()
            .required("Must enter a title")
            .min(2, 'name must be more than two characters'),
        content: yup.string().required("Must enter content for your post"),
      })
    
    // const initValues = post
    const formik = useFormik({
        enableReinitialize: true,   
        initialValues:  {
          title:`${post.title}`,
          content:`${post.content}`,
          image_url:`${imageUrl}`,
          video_url:`${videoUrl}`,
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
          fetch(`/post/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }).then((res) => {
            if(res.ok) {
              res.json().then(post => {
                navigate(`/posts/${id}`)
              })
            } else {
                res.json().then(error => setError(error.message))
            }
          })
        },
      })

    return (
        <>
        {error && <h2 style={{color:'red', textAlign:'center'}}> {error} </h2>}
        <div className="ui text container" style={{minHeight:"100vh"}}>
            <form className="ui form" onSubmit={formik.handleSubmit}>
            <h4 style={{marginTop: "10px"}} className="ui horizontal divider">Edit Post</h4>
            <div className="field">
                    <label>Upload image or video then enter post info...<Link style={{float: "right"}} to="/">  Back to homepage</Link></label>
                    <UploadWidget onSetImageUrl={setImageUrl}/>
                    <UploadVideoWidget onSetVideoUrl={setVideoUrl}/>
                    {imageUrl && 
                        <img className="ui circular centered image small" src={imageUrl} alt=""></img>
                    }
                    {videoUrl &&
                        <VideoPlayer videoUrl={videoUrl} />
                    }
                    <input type="text" style={{visibility: "hidden"}} name="image_url" value={formik.values.image_url} placeholder="Image link..." onChange={formik.handleChange}></input>
                    <input type="text" style={{visibility: "hidden"}} name="video_url" value={formik.values.video_url} placeholder="Video link..." onChange={formik.handleChange}></input>                              
                </div>     
                <div className="field">
                    <label>Post Title:</label>
                    <input type="text" name="title" value={formik.values.title} placeholder="Post title..." onChange={formik.handleChange}></input>
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.title}</p>}
                </div>
                <div className="field">
                    <label>Post Content:</label>
                    <textarea type="text" rows="8" name="content" value={formik.values.content} placeholder="Post content..." onChange={formik.handleChange}></textarea>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.content}</p>}
                </div>
                <div className="field">
                {/* <Link to="/" className="ui button small teal" >Back</Link> */}
                <button className="ui circular button fluid teal" type="submit">Submit</button>
                </div>
            </form> 
        </div>
        </>
    )
}

export default EditPost
