import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminReserView=()=>{
  
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchReservData = async () => {
      try {
        const res = await axios.get("http://localhost:8800/reservations/all/" );
         if (res.data && res.data.length > 0) {
          setDetails(res.data);
        } else {
          console.log("data error");
        }
      } catch (error) {
        console.log(error);
        
      }
    };
    fetchReservData();
  }, []);

    return(
        <div>
            <h1>Reservations</h1>
        <table className="table table-primary table-hover table-responsive  ">
          <thead className=" ">
            <tr>
                
              <th>User</th>
              <th>Resource</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Purpose</th>
              <th>Type</th>
    
              
            </tr>
          </thead>
          <tbody className="table-group-divider">
           
          
            
            {details.map((mt) => (
              <tr  key={mt.reservation_id} 
              
              >
               <td>{mt.user_id}</td>
               <td>{mt.resource_id}</td>
                <td>{mt.start_date}</td>
                <td>{mt.end_date}</td>
                <td>{mt.status}</td>
                <td>{mt.purpose}</td>
                <td>{mt.reservation_type}</td>
                
                
              </tr>
            ))}         
          </tbody>
        </table>
      </div>
    );
};
 export default AdminReserView;