import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

import {base_url} from '../../config';

const MaintenanceAdd = () => {
const {id}=useParams();
const navigate = useNavigate();
const[info,setInfo]= useState({
    resource_id: id,
    maintenance_type: "Select a type",
    start_date: "",
    completion_date: "",
    status: "Undone",
});

const[resData,setresData]=useState();
const[ex,setEx]=useState(false);

const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   // console.log(info);
  };


  const handleSave = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: " ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleIsConfirmed();
        
      }
    });
  };

  const handleIsConfirmed = async () => {
       
    try {
      const responce = await axios.post(
        `${base_url}/maintenance/maintenaceadd`,
        info
      );
      if(responce.data=="Done"){
       Swal.fire("Maintenance Added!", "No exsiting reservations affected!", "success");      
       navigate(`/maintenance/${id}`);
      console.log(responce.data);
         }else if(responce.data=="start_end_error"){
          Swal.fire('Warning!', 'Requested ending date should be greater than starting date! ', 'warning');
        }else{
          Swal.fire('There are affecting reservations in this period!', 'Remove them or reschedule maintenance ', 'warning');

          setresData(responce.data);
           navigate(`/maintenanceClashes/${id}/${responce.data.join(',')}`);
          // console.log(responce.data);
          // console.log("from var:"+resData);
           
         }

    } catch (error) {
      console.log(error);
    }
  }; 

  const handleClear = (e) => {
    e.preventDefault();
    setInfo({
        resource_id: id,
        maintenance_type: "Select a type",
        start_date: "",
        completion_date: "",
        status: "Undone"
    });
  };


return(
     
    <div className="container-md">
        <div className="row my-5 ">
          <div className="col-6 bg-primary-subtle mx-auto shadow rounded">
            <h1 className="my-3">Schedule a Maintenance</h1>
         
            <form>
              <div className="row">
                
                <div className="form-group col">
                  <label htmlFor="" className="form-label ">
                    Maintenance Type
                  </label>
                  <select
                    className="form-select"
                    name="maintenance_type"
                    value={info.maintenance_type}
                    onChange={(e) => handleChange(e)}
                  >
                    <option selected disabled>
                      Select a type
                    </option>
                    <option value="regular">regular</option>
                    <option value="unforeseen">unforeseen</option>
                    
                  </select>
                </div>
              </div>
 
              <br/>

             
<div className="row " >
<div className="form-group col">
<label htmlFor="" className="form-label ">
      Start Date:  
    </label>

    <input type="datetime-local"  
    className="form-control"
      onChange={(e) => handleChange(e)}
      value={info.start_date}
      id=""
      name="start_date"></input>
</div></div>
<br/>
<div className="row " >
<div className="form-group col">
<label htmlFor="" className="form-label ">
      Completion Date:  
    </label>

    <input type="datetime-local"  
    className="form-control"
      onChange={(e) => handleChange(e)}
      value={info.completion_date}
      id=""
      name="completion_date"></input>
</div></div>
              
  

              </form>

<div className="my-3">
  <button
    type="button"
    className="btn btn btn-success  "
    onClick={(e) => handleSave(e)}
  >
    Save
  </button>
  <button
    type="button"
    className="btn btn btn-danger m-2"
    onClick={(e) => handleClear(e)}
  >
    Clear
  </button>
</div>
</div>
</div>
</div>

);

};
export default MaintenanceAdd;