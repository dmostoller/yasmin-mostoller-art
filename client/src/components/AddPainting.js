import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import UploadWidget from "./UploadWidget";
import { useFolders } from "../context/folder";

function AddPainting() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const { folders } = useFolders();

    const folderList = folders.map((folder) => {
        return (
            <option value={folder.id}>{folder.name}</option>
        )
    })

    const formSchema = yup.object().shape({
        title: yup.string().required("Please enter a title"),
        materials: yup.string().required("Please enter materials used"),
        width: yup.number().integer()
        .required("Please enter a width")
        .min(0, "Width cannot be a negative number"),
        height: yup.number().integer()
        .required("Please enter a height")
        .min(0, "Height cannot be a negative number"),
        sale_price: yup.string().required("Please enter an price"),
        image: yup.string().required("Please enter an image link"),
        sold: yup.string()
        .required("Please select a value"),
        folder_id: yup.number()
        .required("Please select a value")
    })
    const formik = useFormik({
        enableReinitialize: true, 
        initialValues: {
            title:'',
            materials:'',
            width:'',
            height:'',
            sale_price:'',
            image:`${imageUrl}`,
            sold:'',
            folder_id:'',
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
                    <img className="ui rounded centered image medium" src={imageUrl} style={{marginTop: "10px"}} alt=""></img>
                    <input type="text" style={{visibility: "hidden"}} name="image" value={formik.values.image} placeholder="Image link..." onChange={formik.handleChange}></input>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.image}</p>}
                </div>   
                <div className="field">
                    <label>Title</label>
                    <input type="text" name="title" value={formik.values.title} placeholder="Title..." onChange={formik.handleChange}></input>
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.title}</p>}
                </div>
                <div className="field">
                    <label>Materials</label>
                    <input type="text"name="materials" value={formik.values.materials} placeholder="Materials..." onChange={formik.handleChange}></input>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.materials}</p>}
                </div>    
                <div className="field">
                    <label>Width</label>
                    <input type="text"  name="width" value={formik.values.width} placeholder="Width in inches..." onChange={formik.handleChange}></input>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.width}</p>}
                </div>    
                <div className="field">
                    <label>Height</label>
                    <input type="text" name="height" value={formik.values.height} placeholder="Height in inches..." onChange={formik.handleChange}></input>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.height}</p>}
                </div>    
                <div className="field">
                    <label>Sale Price</label>
                    <input type="text" name="sale_price" value={formik.values.sale_price} placeholder="Price..." onChange={formik.handleChange}></input>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.sale_price}</p>}
                </div>           
                <div className="field">
                    <select className="ui selection dropdown"
                        name="sold"
                        style={{padding: "5px"}}
                        onChange={formik.handleChange}
                        value={formik.values.sold}>
                        <option value="false">For Sale </option>
                        <option value="true">Sold</option>
                    </select>              
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.sold}</p>}
                </div>
                <div className="field">
                    <label>Folder</label>
                    <select className="ui selection dropdown"
                        name="folder_id"
                        style={{padding: "5px"}}
                        onChange={formik.handleChange}
                        value={formik.values.folder_id}>
                        {folderList}
                    </select>              
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.folder_id}</p>}
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
