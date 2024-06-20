import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useUser } from "../context/user";


function SignUp() {
  const { setUser } = useUser()
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  function tryAgain() {
    setError(null)
  }

  const formSchema = yup.object().shape({
    username: yup.string()
    .min(2, 'Name must be minimum 2 characters')
    .max(100, 'Name must not be more than 100 characters')
    .required("Username is required"),
    password: yup.string()
    .min(4, 'Password must be at least 4 characters')
    .required("Password is required"),
    password_confirmation: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required("Confirm password is required"),
    email: yup.string().email()
    .required("Must enter an email address"),
})
const formik = useFormik({
  initialValues: {
      username:'',
      email:'',
      password:'',
      password_confirmation:'',
  },
validationSchema: formSchema,
onSubmit: (values) => {
  fetch("/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  }).then((r) => {
    if (r.ok) {
      r.json().then(user => {
        setUser(user)
        navigate('/')
    })
    } else {
        r.json().then(error => setError(error.message))
    }
  })
},
})

if(error) return (
    <>
     <div className="ui center aligned grid" style={{minHeight:"100vh"}}>
       <div className="column" style={{width:"450px"}}>
       <h4 className="ui image header">
           <div className="content"><span className="ui red text">{error}</span></div>
       </h4>
       <button onClick={tryAgain} className="ui circular fluid button large grey" type="submit">Try Again</button>
     </div>
   </div>      
         
   </>)
  return (
    <div className="ui center aligned grid" style={{minHeight:"100vh"}}>
            <div className="column" style={{width:"450px"}}>
            <h2 className="ui image header">
          <div className="content">Create a new account</div>
        </h2>
        <form className="ui form" onSubmit={formik.handleSubmit}>
            <div className="field">
                <div className="ui left icon input">
                <i className="user icon"></i>
                <input type="text" 
                  id="username" 
                  name="username" 
                  value={formik.values.username} 
                  placeholder="Username..." 
                  onChange={formik.handleChange}
                  >    
                </input>   
                </div>                 
                {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.username}</p>}
            </div>
            <div className="field">
            <div className="ui left icon input">
                <i className="mail icon"></i>
                <input type="text" 
                  id="email" 
                  name="email" 
                  value={formik.values.email} 
                  placeholder="Email Address..." 
                  onChange={formik.handleChange}
                  >
                </input>  
                </div>              
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
                <button className="ui circular fluid button large teal" type="submit">
                    Submit
                </button>
            </div>
            <div className="ui grey message tiny">
             Already have an account? 
              <Link to="/login">    Login</Link>
            </div>
        </form> 
    </div>
    </div>

)
}

export default SignUp;
