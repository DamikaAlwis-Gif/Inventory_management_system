import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import TableMtClashHandle from "./TableMtClashHandle";
import axios from "axios";
import Swal from "sweetalert2";
import {base_url} from '../../config';

const MtClashHandle=()=>{
    const {id, data } = useParams();
    const decodedData = data.split(',');
    const [rows,setRows]=useState([]);
    const navigate = useNavigate();



    useEffect(() => {
        const fetchClashData = async (id) => {
          try {
            const res = await axios.post(`${base_url}/maintenance/maintenanceClash/`,decodedData);
           
            if (res.data && res.data.length > 0) {
            setRows(res.data);
             // console.log(res.data);
            } else {
              console.log("something went wrong");
            }
          } catch (error) {
            console.log(error);
            
          }
        };
        fetchClashData(id);
      }, []);
//
    const handleProceed = (e) => {
        e.preventDefault();
        Swal.fire({
          title: "All the above reservations will be permamantly removed. Are you sure ?",
          text: " ",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, add maintenance!",
        }).then((result) => {
          if (result.isConfirmed) {
            handleIsConfirmed();
            
          }
        });
        };

        const handleIsConfirmed = async () => {
            try {
              const res = await axios.put(`${base_url}/maintenance/maintenanceDelUpdate`);
              if (res.data === "Done") {
                Swal.fire("Maintenance Added!", "Clashing reservations are deleted!", "success");
                navigate(`/maintenance/${id}`);
              } else {
                console.log("Unexpected response:", res.data);
              }
            } catch (error) {
              console.error("An error occurred:", error);
            }
          };
           

    const handleCancel = (e) => {
        //navigate(`/maintenance/${id}`);
       navigate(-1);
        };

    return (
        <div>
        <h3 className="text-center"> All the affected reservations of the item due to this scheduling maintenance:</h3>
        <div className="container">
          <div className="row">
            <div className="col-md mx-auto">
                           
              <TableMtClashHandle details={rows} ></TableMtClashHandle>
             
            </div>
          </div>
          <div className="row">
            <div className="col-md mx-auto">
            <button
             type="button"
              className="btn btn btn-success  "
              onClick={(e) => handleProceed(e)}
                 >
             Proceed
         </button>
        <button
          type="button"
             className="btn btn btn-danger m-2"
             onClick={(e) => handleCancel(e)}
        >
          Cancel
         </button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default MtClashHandle;