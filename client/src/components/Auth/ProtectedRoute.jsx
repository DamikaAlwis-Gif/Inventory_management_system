import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashBoard from "../dashboard/DashBoard";
import url from "../utils/configure";
const ProtectedRoute = (props) => {
  
  const [auth, setAuth] = useState(false);
  const [name, setname] = useState({});
  const [role, setrole] = useState({});
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const { allowedRoles, children } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAuth = async () => {
      try {
        const response = await axios.get(url.API_URL+"/auth");

        console.log(response);
        if (response.data.status === "ok") {
          setAuth(true);
          setname(response.data.name);
          setrole(response.data.role);
        } else {
          setAuth(false);
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    getAuth();
  }, []);

  return !loading ? (
    <div>
      {auth && allowedRoles.includes(role) ? (
        <>{children}</>
      ) : (
        <>
          <DashBoard></DashBoard>
        </>
      )}
    </div>
  ) : null;
};

export default ProtectedRoute;
