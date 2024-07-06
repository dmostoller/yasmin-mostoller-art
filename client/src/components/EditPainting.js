import React, {useState, useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import UploadWidget from "./UploadWidget";


function EditPainting() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [painting, setPainting] = useState({})
    const {id} = useParams();
    const [imageUrl, setImageUrl] = useState("");


    useEffect(() => {
        fetch(`/painting/${id}`)
        .then((res) => res.json())
        .then((painting) => {
          setPainting(painting)
          setImageUrl(painting.image)
        })
    }, [id]);

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
        .required("Please enter True or False")
    })
    // const initValues = painting
    
    const formik = useFormik({
      enableReinitialize: true,   
      initialValues: {
        title:`${painting.title}`,
        materials:`${painting.materials}`,
        width:`${painting.width}`,
        height:`${painting.height}`,
        sale_price:`${painting.sale_price}`,
        image:`${imageUrl}`,
        sold:`${painting.sold}`,
    },
      validationSchema: formSchema,
      onSubmit: (values) => {
        fetch(`/painting/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }).then((res) => {
          if(res.ok) {
            res.json().then(painting => {
              navigate(`/paintings/${id}`)
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
            <h4 style={{marginTop: "10px"}} className="ui horizontal divider">Edit Painting</h4>
                <div className="field">
                    <label>Upload image, then enter painting info...<Link style={{float:"right"}} to={`/paintings/${id}`}>  Back to Painting</Link></label>
                    <UploadWidget onSetImageUrl={setImageUrl}/>
                    <img className="ui circular centered image small" src={imageUrl} style={{marginTop: "10px"}} alt=""></img>
                    <input style={{visibility: "hidden"}} type="text" name="image" value={formik.values.image} placeholder="Image link..." onChange={formik.handleChange}></input>                
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
                <label>Price</label>
                    <input type="text" name="sale_price" value={formik.values.sale_price} placeholder="Price..." onChange={formik.handleChange}></input>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.sale_price}</p>}
                </div>       
                <div className="field">
                    {/* <input type="text" name="sold" value={formik.values.sold} placeholder="True or False..." onChange={formik.handleChange}></input>  */}
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
                {/* <Link to={`/paintings/${id}`} className="ui button small teal" >Back</Link> */}
                <button className="ui circular button fluid teal" type="submit">Submit</button>
                </div>
            </form> 
        </div>
        </>
    )
}

export default EditPainting
