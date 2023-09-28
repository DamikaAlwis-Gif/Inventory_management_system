import TechDashboard from "./DashboardTech";
import UserDashboard from "./DashboardUser";
import ClerkDashboard from "./DashboardClerk";

import { useState, useEffect } from "react";
import axios from 'axios';

export default function CustomDashboard () {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  const [userRole , setUserRole] = useState("");
  axios.defaults.withCredentials = true;

  useEffect (() => {
    const getAuth = async () => {
      try {
        const response = await axios.get("http://localhost:8800/auth");

        if (response.data.status === "ok") {
          setAuth(true);
          setUserRole(response.data.role);
        } else {
          setAuth(false);
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    }
    getAuth();
  }, []);

  if (["Admin", "Technical Officer"].includes(userRole))
    return (<TechDashboard />)
  if (["Student", "Academic Staff Member"].includes(userRole))
    return (<UserDashboard />)
  if (["Office Clerk"].includes(userRole))
    return (<ClerkDashboard />)
}