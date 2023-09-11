import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Button from "@mui/material/Button";
import  Alert from '@mui/material/Alert';
import { validateProperty , validate } from "../Validation/LoginValidation";
import userImage from "../../Images/user.png";
import institutionLogo from "../../Images/InstitutionLogo.svg"; 


const Login = () => {

  const [value, setValue] = useState({
    user_name: "",
    password: "",
  });
  axios.defaults.withCredentials = true;
  const [errors, setErrors] = useState({});

   
  const handleChange = (e) => {
    
    
    const errorslist = { ...errors };
    const error =validateProperty(e.target);
    
    if (error) errorslist[e.target.name] = error;
    else delete errorslist[e.target.name]; 
    setErrors(errorslist);
    setValue({ ...value, [e.target.name]: e.target.value });
    
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(value);
    setErrors(errors || {});
    if (errors) return;
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
  console.log(value)
  return (
    <div className="container mt-5">
      <div className="row justify-content-center g-0">
        <div className="card  shadow border-2" style={{ maxWidth: "700px" }}>
          <div
            className="card-header text-center"
            style={{ backgroundColor: "#007BFF", color: "white" }}
          >
            <h5 className="card-title" style={{ fontSize: "30px" }}>
              Login
            </h5>
          </div>

          <div className="row g-0">
            <div className="col-md-4">
              <div className="custom-logo">
                <img src={institutionLogo} alt="Logo" />
              </div>
              <div className="custom-name" style={{ lineHeight: "0.8" }}>
                <span className="first-word">Wisdom</span>
                <br />
                <span className="second-word" style={{ fontSize: "0.7em" }}>
                  Education
                </span>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card-body ">
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Enter username"
                      name="user_name"
                      value={value.user_name}
                      onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="username">Username</label>
                    {errors.user_name && (
                      <Alert severity="warning">{errors.user_name}</Alert>
                    )}
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter password"
                      name="password"
                      value={value.password}
                      onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="password">Password</label>
                    {errors.password && (
                      <Alert severity="warning">{errors.password}</Alert>
                    )}
                  </div>
                  {/* <button type="submit" className="btn btn-primary btn-sm">
                  Login
                </button> */}
                  <button className="btn btn-primary btn" type="submit">
                    Login
                  </button>

                  <Link to="/register" className="btn btn-link my-2 ">
                    Create Account
                  </Link>
                </form>
              </div>
            </div>
          </div>
          {/* <div
            className="card-header text-center"
            style={{ fontWeight: "bolder", fontSize: "30px" }}
          >
            Login
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
