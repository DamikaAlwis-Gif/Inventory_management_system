import React from 'react'
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [value, setValue] = useState({
      name: "",
      user_name: "",
      email: "",
      password: "",
      user_id: "",
      role: "Select a role",
      phone_number: "",
    });
    
    const handleChange = (e) => {
      e.preventDefault();
      //e.taget.value is the value of the input field
      setValue({ ...value, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();
    const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8800/auth/register", value);
      if (res.data.status === "ok") {
        navigate("/");
        alert("Registeration success");
      } else {
        alert("Registeration not success"); // database error maybe
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
              Sign Up
            </div>
            <div className="card-body">
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                  <label htmlFor="user_id">User ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="user_id"
                    placeholder="Enter user id"
                    value={value.user_id}
                    name="user_id"
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter username"
                    value={value.user_name}
                    name="user_name"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    value={value.password}
                    name="password"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter your name"
                    value={value.name}
                    name="name"
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="role">Role</label>
                  <select
                    className="form-select"
                    id="role"
                    name="role"
                    value={value.role}
                    onChange={(e) => handleChange(e)}
                  >
                    <option selected disabled>
                      Select a role
                    </option>
                    <option value="Admin">Admin</option>
                    <option value="Technical Officer">Technical Officer</option>
                    <option value="Student">Student</option>
                    <option value="Academic Staff Member">
                      Academic Staff Member
                    </option>
                    <option value="Office Clerk">Office Clerk</option>
                  </select>
                </div>
                <div className="form-group my-2">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    value={value.email}
                    name="email"
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    value={value.phone_number}
                    name="phone_number"
                    placeholder="123-456-7890"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <button type="submit" className="btn btn-primary my-2">
                  Sign Up
                </button>
                <Link to="/" className="btn btn-link my-2 ">
                  Login
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register