import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import UploadWidget from "./UploadWidget";
import UploadVideoWidget from "./UploadVideoWidget";
import VideoPlayer from "./VideoPlayer";

function AddPost() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);


    const formSchema = yup.object().shape({
        title: yup.string()
            .required("Please enter a title")
            .min(2, 'name must be more than two characters long'),
        content: yup.string().required("Please enter content for your post"),
      })

    const formik = useFormik({
      enableReinitialize: true, 
        initialValues: {
          title:'',
          content:'',
          image_url:`${imageUrl}`,          
          video_url:`${videoUrl}`,
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
          fetch("/post", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }).then((res) => {
            if(res.ok) {
              res.json().then(post => {
                navigate(`/`)
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
            <h4 style={{marginTop: "50px"}} className="ui horizontal divider">Add New Post</h4>
                <div className="field">
                    <label>Upload image or video then enter post info...<Link style={{float: "right"}} to="/">  Back to homepage</Link></label>
                    <UploadWidget onSetImageUrl={setImageUrl}/>
                    <UploadVideoWidget onSetVideoUrl={setVideoUrl}/>
                    {imageUrl && 
                        <img style={{marginTop: "5px"}} className="ui rounded centered image medium" src={imageUrl} alt=""></img>
                    }
                    {(videoUrl !== "undefined" && videoUrl !== null && videoUrl !== "null") &&
                      <div className="image">
                        <VideoPlayer videoUrl={videoUrl} />
                      </div>
                    }
                    <input type="text" style={{visibility: "hidden"}} name="image_url" value={formik.values.image_url} onChange={formik.handleChange}></input>
                    <input type="text" style={{visibility: "hidden"}} name="video_url" value={formik.values.video_url} onChange={formik.handleChange}></input>                              
                </div>   
                <div className="field">
                    <input type="text" name="title" value={formik.values.title} placeholder="Post title..." onChange={formik.handleChange}></input>
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.title}</p>}
                </div>
                <div className="field">
                    <textarea type="text" rows="6" name="content" value={formik.values.content} placeholder="Post content..." onChange={formik.handleChange}></textarea>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.content}</p>}
                </div>
                <div className="field">
                {/* <Link to="/" className="ui button small teal" >Back</Link> */}
                <button className="ui circular fluid button teal" type="submit">Submit</button>
                </div>
            </form> 
        </div>
        </>
    )
}

export default AddPost

