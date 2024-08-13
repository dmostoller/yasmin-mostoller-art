import React, { useState } from "react";
import { useUser } from "../context/user";
import { useFormik } from "formik";
import * as yup from "yup";
import {Link} from "react-router-dom";


export default function EditUser ({setShowEdit}) {
    const [error, setError] = useState(null);
    const { user, setUser} = useUser();

    function tryAgain() {
        setError(null)
      }

    const formSchema = yup.object().shape({
        username: yup.string()
            .required("Username is required")
            .min(2, 'Username must be more than two characters long')
            .max(50, 'Name must not be more than 50 characters long')
            .required("Username is required"),
        password: yup.string()
            .min(4, 'Password must be at least 4 characters')
            .required("Password is required"),
        password_confirmation: yup.string()
            .oneOf([yup.ref('password')], 'Passwords must match')
            .required("Confirm password is required"),
        email: yup.string()
        .required("Email is required")
        .email("Please enter a valid email address")
      })
    
    const initValues = user
    const formik = useFormik({
        enableReinitialize: true,   
        initialValues: initValues,
        validationSchema: formSchema,
        onSubmit: (values) => {
          fetch(`/update_user/${user.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }).then((res) => {
            if(res.ok) {
              res.json().then(user => {
                setUser(user)
                setShowEdit()
              })
            } else {
                res.json().then(error => setError(error.message))
            }
          })
        },
      })

if(error) return (
    <>
     <div className="ui center aligned grid" style={{minHeight:"100vh"}}>
       <div className="column" style={{width:"450px"}}>
       <h4 className="ui image header">
           <div className="content" style={{marginTop: "50px"}}><span className="ui red text">{error}</span></div>
       </h4>
       <button onClick={tryAgain} className="ui circular fluid button large grey">Try Again</button>
     </div>
   </div>      
         
   </>)

    return (
        <div className="ui inverted container" style={{marginTop: "50px"}}>
            <h4 className="ui horizontal divider">My Account</h4>
            <div className="ui centered grid">
                <div className="ui card" style={{margin: "25px"}}>
                    <div className="content" style={{padding: "25px"}}>
                        <form className="ui form" type="submit" onSubmit={formik.handleSubmit}>
                            <div className="field">
                                <label><span style={{float:'left'}}>Update User Details & Password</span><a onClick={setShowEdit} style={{float:'right'}}>Back</a></label>
                                <input type="text" id="username" name="username" value={formik.values.username} onChange={formik.handleChange}></input>               
                                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.username}</p>}
                            </div>
                            <div className="field">
                                <input type="text" id="email" name="email" value={formik.values.email} onChange={formik.handleChange}></input>
                                {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.email}</p>}
                            </div>
                            <div className="field">
                        <div className="ui left icon input">
                            <i className="lock icon"></i>
                            <input type="password" 
                                id="password" 
                                name="password" 
                                value={formik.values.password} 
                                placeholder="Password..." 
                                onChange={formik.handleChange}
                            >
                            </input>
                        </div>
                            {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.password}</p>}
                        </div>   
                        <div className="field">
                        <div className="ui left icon input">
                            <i className="lock icon"></i>
                            <input type="password" 
                                id="password_confirmation" 
                                name="password_confirmation" 
                                value={formik.values.password_confirmation} 
                                placeholder="Password Confirmation..." 
                                onChange={formik.handleChange}
                            >
                            </input>
                        </div>
                            {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.password_confirmation}</p>}                    
                        </div>
                            <div className="field"> 
                                <button className="ui circular button fluid teal" type="submit">Submit</button>
                            </div>       
                        </form>
                    </div>
                </div>
            </div>
            <div className="ui centered padded grid">
                <Link target='_blank' to='https://analytics.google.com/analytics/web/?authuser=1#/p451159949/reports/intelligenthome'
                    className='ui large teal labeled icon button'
                >
                <i className="chartline icon"></i>
                Google Analytics
                </Link>
            </div>
        </div>
    );
}
