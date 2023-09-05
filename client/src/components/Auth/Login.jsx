import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [value, setValue] = useState({
    user_name: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  console.log(errors);
  console.log(value);

  const validateProperty = ({ name, value }) => {
    if (name === "user_name") {
      if (value.trim() === "") return "Username is required";
    }
    if (name === "password") {
      if (value.trim() === "") return "Password is required";
    }
  }

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
    const errors = validate();
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
  const validate = () => {
    const erros = {};
    const { user_name, password } = value;
    if (user_name.trim() === "") {
      erros.user_name = "Username is required";
    }
    if (password.trim() === "") {
      erros.password = "Password is required";
    }
    return Object.keys(erros).length === 0 ? null : erros;
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
                  {errors.user_name && (
                    <div className="alert alert-danger alert-sm">
                      {errors.user_name}
                    </div>
                  )}
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
                  {errors.password && (
                    <div className="alert alert-danger alert-sm">
                      {errors.password}
                    </div>
                  )}
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
};

export default Login;
