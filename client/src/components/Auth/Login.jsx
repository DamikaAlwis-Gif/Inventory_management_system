import React from 'react'
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
 const [value, setValue] = useState({
   user_name: "",
   password: "",
 });

 //axios.defaults.withCredentials = true; // to send cookie
console.log(value);
 const handleChange = (e) => {
   e.preventDefault();
   //e.taget.value is the value of the input field
   setValue({ ...value, [e.target.name]: e.target.value });
 };
 const navigate = useNavigate();

 const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     const res = await axios.post("http://localhost:8800/auth/login", value);
     //console.log(res.data);
     if (res.data.status === "ok") {
       navigate("/dashboard");
     } else {
       alert(res.data.err); // database error maybe
     }
   } catch (error) {
     console.log(error);
     alert(error);
   }
 };

 return (
   <div className="container mt-5">
     <div className="row justify-content-center">
       <div className="col-md-6">
         <div className="card">
           <div
             className="card-header text-center"
             style={{ fontWeight: "bolder" }}
           >
             Login
           </div>
           <div className="card-body ">
             <form onSubmit={(e) => handleSubmit(e)}>
               <div className="form-group">
                 <label htmlFor="username">Username</label>
                 <input
                   type="text"
                   className="form-control"
                   id="username"
                   placeholder="Enter username"
                   name="user_name"
                   value={value.user_name}
                   onChange={(e) => handleChange(e)}
                 />
               </div>
               <div className="form-group my-2">
                 <label htmlFor="password">Password</label>
                 <input
                   type="password"
                   className="form-control"
                   id="password"
                   placeholder="Enter password"
                   name="password"
                   value={value.password}
                   onChange={(e) => handleChange(e)}
                 />
               </div>

               <button type="submit" className="btn btn-primary btn-sm">
                 Login
               </button>
               <Link to="/register" className="btn btn-link my-2 ">
                 Create Account
               </Link>
             </form>
           </div>
         </div>
       </div>
     </div>
   </div>
 );
}

export default Login