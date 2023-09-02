import React from 'react'
import Navbar from './NavBar';
import axios from "axios";
import  { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const DashBoard = () => {
    const [auth, setAuth] = useState(false);
    const [message, setmessage] = useState({});
    const [name, setname] = useState({});
    const [role, setrole] = useState({});
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    useEffect(() => {
      axios.get("http://localhost:8800/auth")
        .then((res) => {
          if (res.data.status === "ok") {
            setAuth(true);
            setname(res.data.name);
            setrole(res.data.role);
          } else {
            setAuth(false);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
  return (
    <div>
        {auth ? (
        <div>
          
          <h1>Welcome {name}</h1>
          </div>
        )
        : null}
    </div>
    
  );
}

export default DashBoard