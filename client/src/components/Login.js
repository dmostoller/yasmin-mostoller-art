import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function LoginForm({ onLogin }) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function tryAgain() {
    setError(null)
  }

  const formSchema = yup.object().shape({
    username: yup.string().required("Please enter a username"),
    password: yup.string().required("Please enter a password"),
})
  const formik = useFormik({
    initialValues: {
        username:'',
        password:'',
    },
  validationSchema: formSchema,
  onSubmit: (values) => {
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((r) => {
      if (r.ok) {
        r.json().then(user => {
          onLogin(user)
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
           <div className="content" style={{marginTop: "110px"}}><span className="ui red text">{error}</span></div>
       </h4>
       <button onClick={tryAgain} className="ui fluid button large grey"ß>Try Again</button>
     </div>
   </div>      
         
   </>)

  return (
    <div className="ui center aligned grid" style={{minHeight:"100vh"}}>
      <div className="column" style={{width:"450px"}}>
        <h2 className="ui image header">
          <div className="content" style={{marginTop: "110px"}}>Log-in to your account</div>
        </h2>
        <form className="ui form initial" onSubmit={formik.handleSubmit}>
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
            <button className="ui circular fluid button large teal" type="submit">Login</button>
            <div>
            </div>
            <div className="ui grey message tiny">
             New to us? 
              <Link to="/signup">    Sign Up</Link>
            </div>
            <div>
            </div>
        </form> 
    </div>
    </div>
)
}

export default LoginForm