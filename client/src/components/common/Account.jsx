import React from 'react'
import { useEffect, useState } from 'react'
import userImage from '../../Images/user.png'
import axios from 'axios';
import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import url from '../utils/configure';
const Account = () => {

    axios.defaults.withCredentials = true;
    const [user, setUser] = useState({});
    const [accessLab, setAccessLab] = useState([]); // array of lab names
    useEffect(() => {
     const getUserInfo = async () => {
        try {
            const res = await axios.get(url.API_URL+"/auth/user");
            //console.log(res.data[0]);
            setUser(res.data[0]);

        } catch (error) {
            console.log(error);
        }
     }
    getUserInfo(); 
    }, [])
    
    useEffect(() => {
        
        const getUserInfo = async () => {
            try {
                const res = await axios.get(url.API_URL + "/auth/access");
                //console.log(res.data);
                let list = [];
                res.data.map((item) => {
                    list.push(item.name);
                })
                setAccessLab(list);
            } catch (error) {
                console.log(error);
            }
        }
        getUserInfo();
        

    }, []);
    console.log(accessLab);
  return (
    <div>
      <div className="container my-5">
        {user && user.role === "Admin" && (
          <Link to="/access">Change access </Link>
        )}
        {user && user.role === "Admin" && (
          <Link to="/users">Users </Link>
        )}

        <div className="row">
          <div className="col-md-4  mx-auto">
            <Paper elevation={4}>
              <div className="card">
                <div
                  className="card-header"
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    backgroundColor: "#cfcfcf",
                    color: "black",
                  }}
                >
                  Profile
                </div>
                <div
                  className="card-body text-center "
                  style={{
                    fontSize: "15px",
                  }}
                >
                  <img
                    src={userImage}
                    alt="User Profile"
                    className="img-fluid rounded-circle mb-3"
                    width="150px"
                  />
                  <h5 className="card-title">{user.name}</h5>
                  <p>Username: {user.user_name}</p>
                  <p>Email: {user.email}</p>
                  <p>Phone: {user.phone_number}</p>
                  <p>Role: {user.role}</p>
                  <div>
                    Have access to labs
                    <p style={{ textAlign: "start", paddingLeft: "32%" }}>
                      {accessLab.map((item) => (
                        <li>{item}</li>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account
