import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";


const MaintenanceAdd = () => {
const {id}=useParams();
const navigate = useNavigate();
const[info,setInfo]= useState({
    resource_id: id,
    maintenance_type: "Select a type",
    start_date: "",
    start_time:"",
    completion_date: "",
    completion_time:"",
    status: "",
});

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
        "http://localhost:8800/resources/maintenaceadd",
        info
      );
      if(responce.data=="Done"){
       Swal.fire("Saved!", "Reservation Added", "success");      
       navigate("/resources");
      console.log(responce.data);
         }else if(responce.data=="start_end_error"){
          Swal.fire('Warning!', 'Requested ending date should be greater than starting date! ', 'warning');
        }else{
          Swal.fire('Item is unavailable at selected time!', 'Please consider selecting another time slot! ', 'warning');
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
        start_time:"",
        completion_date: "",
        completion_time:"",
        status: ""
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
                    <option value="On_premises">simple</option>
                    <option value="Out_premises">hard</option>
                    
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="form-group col">
                  <label htmlFor="" className="form-label ">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id=""
                    onChange={(e) => handleChange(e)}
                    value={info.start_date}
                    name="start_date"
                  />
                </div>
  
                <div className="form-group col">
                  <label htmlFor="" className="form-label ">
                    Start Time
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id=""
                    value={info.start_time}
                    onChange={(e) => handleChange(e)}
                    name="start_time"
                  />
                </div>
              </div>

              <div className="row">
                <div className="form-group col">
                  <label htmlFor="" className="form-label ">
                    Completion Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id=""
                    onChange={(e) => handleChange(e)}
                    value={info.completion_date}
                    name="completion_date"
                  />
                </div>
  
                <div className="form-group col">
                  <label htmlFor="" className="form-label ">
                    Completion Time
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id=""
                    value={info.completion_time}
                    onChange={(e) => handleChange(e)}
                    name="completion_time"
                  />
                </div>
              </div>

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