import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import UploadWidget from "./UploadWidget";

function AddPainting() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    const formSchema = yup.object().shape({
        title: yup.string().required("Must enter a title"),
        materials: yup.string().required("Must enter materials used"),
        width: yup.number().integer()
        .required("Must enter a width")
        .min(0, "Cannot be a negative number"),
        height: yup.number().integer()
        .required("Must enter a height")
        .min(0, "Cannot be a negative number"),
        price: yup.string().required("Must enter an price"),
        image: yup.string().required("Must enter an image link"),
        sold: yup.string()
        .required("Must enter True or False")
    })
    const formik = useFormik({
        enableReinitialize: true, 
        initialValues: {
            title:'',
            materials:'',
            width:'',
            height:'',
            price:'',
            image:`${imageUrl}`,
            sold:'',
        },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/painting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => {
        if(res.ok) {
          res.json().then(painting => {
            // onAddPainting(painting)
            navigate(`/paintings`)
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
            <h4 style={{marginTop: "10px"}} className="ui horizontal divider">Add New Painting</h4>
                <div className="field">
                    <label>Upload image then enter painting info...<Link style={{float: "right"}} to="/paintings">  Back to Paintings Page</Link></label>
                    <UploadWidget onSetImageUrl={setImageUrl}/>
                    <img className="ui circular centered image small" src={imageUrl} style={{marginTop: "10px"}} alt=""></img>
                    <input type="text" style={{visibility: "hidden"}} name="image" value={formik.values.image} placeholder="Image link..." onChange={formik.handleChange}></input>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.image}</p>}
                </div>   
                <div className="field">
                    <input type="text" name="title" value={formik.values.title} placeholder="Title..." onChange={formik.handleChange}></input>
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.title}</p>}
                </div>
                <div className="field">
                    <input type="text"name="materials" value={formik.values.materials} placeholder="Materials..." onChange={formik.handleChange}></input>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.materials}</p>}
                </div>    
                <div className="field">
                    <input type="text"  name="width" value={formik.values.width} placeholder="Width in inches..." onChange={formik.handleChange}></input>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.width}</p>}
                </div>    
                <div className="field">
                    <input type="text" name="height" value={formik.values.height} placeholder="Height in inches..." onChange={formik.handleChange}></input>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.height}</p>}
                </div>    
                <div className="field">
                    <input type="text" name="price" value={formik.values.price} placeholder="Price..." onChange={formik.handleChange}></input>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.price}</p>}
                </div>           
                <div className="field">
                    <label for="sold">Is the painting already sold?</label>
                    <input type="text" name="sold" value={formik.values.sold} placeholder="True or False..." onChange={formik.handleChange}></input>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.sold}</p>}
                </div>
                <div className="field">
                {/* <Link to="/paintings" className="ui button small teal" >Back</Link> */}
                <button className="ui circular button fluid teal" type="submit">Submit</button>
                </div>
            </form> 
        </div>
        </>
    )
}

export default AddPainting
