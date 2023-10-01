import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Typography from '@mui/material/Typography';

const UserReserView=()=>{
  const [details, setDetails] = useState([]);
  
 // const [user_name, setName] = useState("");

  useEffect(() => {
  
    const fetchReservData = async () => {
      try {
        const res = await axios.get("http://localhost:8800/reservations/myReservations/" );
         if (res.data && res.data.length > 0) {
          setDetails(res.data);
         // setName(res.data.name);
        
        } else {
          console.log("data error");
        }
      } catch (error) {
        console.log(error);
        
      }
    };
    fetchReservData();
  }, []);
 // console.log("name is:"+user_name);

    return(
      <div>
          <Typography
            variant="h4"
            gutterBottom
            mb={4} 
            align="center"
            style={{color: '#ffffff', padding: "20px 0px 10px 0px"}}>
              My Reservations
          </Typography>
  <table className="table table-primary table-hover table-responsive  ">
    <thead className=" ">
      <tr>
         
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
 export default UserReserView;
