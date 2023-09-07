import React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
const Navbar = () => {

    const  navigate = useNavigate();
    const handleLogout = async (e) => {
         e.preventDefault();
         try {
            const res = await axios.get("http://localhost:8800/auth/logout");
            if(res.data.status === "ok"){
                navigate("/");}
            
         } catch (error) {
            console.log(error);
         }
        
    };
  return (
    <nav className="navbar navbar-expand-lg sticky-top bg-dark">
      <div className="container fluid">
        <a className="navbar-brand" href="" style={{ color: "white" }}>
          Your Logo
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a
                className="nav-link"
                href="/dashboard"
                style={{ color: "white" }}
              >
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/resources"
                style={{ color: "white" }}
              >
                Resources
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/contact"
                style={{ color: "white" }}
              >
                Contact
              </Link>
            </li>

            <li className="nav-item">
              <a
                className="nav-link"
                href="/account"
                style={{ color: "white" }}
              >
                Account
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="/reports"
                style={{ color: "white" }}
              >
                Reports
              </a>
            </li>

            <li className="nav-item">
              <button
                className="btn btn-danger btn-sm mt-2"
                onClick={(e) => handleLogout(e)}
              >
                Log out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
