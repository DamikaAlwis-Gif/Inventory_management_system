import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {base_url} from '../../config';

import TableMaintenance from "./TableMaintenance";

import Typography from '@mui/material/Typography';

const Maintenance = () => {

    const { id } = useParams();
    const [details, setDetails] = useState([]);
    const [ok, setok] = useState(true);
    
    
    const navigate = useNavigate();



    useEffect(() => {
        const fetchMaintenaceData = async (id) => {
          try {
            const res = await axios.get(`${base_url}/maintenance/resmaintenance/` + id);
            if (res.data && res.data.length > 0) {
              setDetails(res.data);
            } else {
              setok(false);
            }
          } catch (error) {
            console.log(error);
            
          }
        };
        fetchMaintenaceData(id);
      }, []);

      const handleAddNew = async (e) => {
        try {
          e.preventDefault();
           navigate(`/maintenanceAdd/${id}`);
        } catch (error) {
          console.log(error);
        }
      };

      const handleMark = (e, m_id) => {
        e.preventDefault();

        Swal.fire({
            title: "Are you sure to change status?",
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

        
        // navigate(`/maintenance/${id}`);
      };

      const updateStatus = async (m_id) => {
        try {
         
          const url = `${base_url}/maintenance/updtmtschedule/`+ m_id;
          const res = await axios.get(url);
          Swal.fire("Updated!", "Maintenance is done", "success");         
          // console.log(res.data);
        } catch (error) {
         Swal.fire("Error!", "Something went wrong!", "error");
          console.log(error);
        }
      };

      //<TableReservDates details={details} ></TableReservDates>

return(
    <div>
    {ok ? (
      <div>
      <Typography
        variant="h4"
        gutterBottom
        mb={4} 
        align="center"
        style={{color: '#ffffff', padding: "20px 0px 10px 0px"}}>
          Currently Scheduled Maintenance of the Selected Item
      </Typography>
        <div className="container">
          <div className="row">
            <div className="col-md mx-auto">
              
              <button className="btn btn btn-success btn-sm m-2" onClick={(e) => handleAddNew(e)}> Add New Maintenance
              </button>


              
             
              <TableMaintenance details={details} onClickMore={handleMark}></TableMaintenance>
             
            </div>
          </div>
          ;
        </div>
      </div>
    ) : (
      <div className="container text-center p-5">
        <p className="display-6" style={{color: "white"}}>
          No scheduled maintenances yet for the item with Resorce_id {id}!
        </p>
        <button className="btn btn btn-success btn-sm m-2" onClick={(e) => handleAddNew(e)}> Add New Maintenance
        </button>
      </div>
    )}
  </div>
);
};
export default Maintenance;
