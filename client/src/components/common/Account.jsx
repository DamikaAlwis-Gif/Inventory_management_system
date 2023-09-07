import React from 'react'
import { useEffect, useState } from 'react'

import axios from 'axios';
const Account = () => {

    axios.defaults.withCredentials = true;
    const [user, setUser] = useState({});
    const [accessLab, setAccessLab] = useState([]); // array of lab names
    useEffect(() => {
     const getUserInfo = async () => {
        try {
            const res = await axios.get("http://localhost:8800/auth/user");
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
                const res = await axios.get("http://localhost:8800/auth/access");
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
        <div className="row">
          <div className="col-md-4  mx-auto">
            <div className="card  ">
              <div className="card-header">Profile</div>
              <div className="card-body text-center ">
                <img
                  src="https://via.placeholder.com/150"
                  alt="User Profile"
                  className="img-fluid rounded-circle mb-3"
                />
                <h5 className="card-title">{user.name}</h5>
                <p>Username: {user.user_name}</p>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone_number}</p>
                <p>Role: {user.role}</p>
                <p>
                  Have access to :
                  {accessLab.map((item) => (
                    <li>{item}</li>
                  ))}
                </p>

                {/* <a href="#" className="btn btn-primary">
                Edit Profile
              </a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account