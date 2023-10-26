import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import TableView from "./TableView";
import {base_url} from '../../config';


import Typography from '@mui/material/Typography';

const AdminMaintenanceView=()=>{
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchMaintenanceData = async () => {
      try {
        const res = await axios.get(`${base_url}/maintenance/all/` );
         if (res.data && res.data.length > 0) {
          setDetails(res.data);
        } else {
          console.log("data error");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMaintenanceData();
  }, []);

  const handleMark = (e, m_id) => {
    e.preventDefault();

    Swal.fire({
        title: "Are you sure you want to change status?",
        text: " ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
        
          updateStatus(m_id);
          window.location.reload();
        }
      });
  };

  const updateStatus = async (m_id) => {
    try {
     
      const url = `${base_url}/resources/updtmtschedule/`+ m_id;
      const res = await axios.get(url);
      Swal.fire("Updated!", "Maintenance is done", "success");         
      // console.log(res.data);
    } catch (error) {
     Swal.fire("Error!", "Something went wrong!", "error");
      console.log(error);
    }
  };

    return(
      <div className="container">
          <Typography
            variant="h4"
            gutterBottom
            mb={4} 
            align="center"
            style={{color: '#ffffff', padding: "20px 0px 10px 0px"}}>
              Scheduled Maintenance
          </Typography>

      <div className="container">
        <div className="row">
          <div className="col-md mx-auto">
                      
            <TableView details={details} onClickMore={handleMark}></TableView>
           
          </div>
        </div>
      </div>
    </div>
            
    );
};
 export default AdminMaintenanceView;
