import React from 'react'
import { useState } from "react";
import axios from "axios";
import TableReport from './TableReport';
const CheckOutInReport = (props) => {
  // const { formDetails, handleChange, handleForm } = props;
  const { accessLab } = props;
  const [details, setDetails] = useState([]);
  const [formDetails, setFormDetails] = useState({
    resource_id: "",
    start_date: "",
    end_date: "",
    status: "All",
    lab: "All",
  });
  const { resource_id, start_date, end_date, status, lab } = formDetails;
  const statusList = ["All", "Checked-out", "Checked-in", "Overdue"];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // console.log(formDetails);
 
  const handleForm = (e) => {
    e.preventDefault();
    
    const getDetails = async () =>{
      try {
        let resource_id_temp = resource_id;
        let start_date_temp = start_date;
        let end_date_temp = end_date;

        if(resource_id===""){
           resource_id_temp = "All";
        }
        
        if(start_date===""){
          start_date_temp = "All";
        }
        if(end_date===""){
          end_date_temp = "All";
        }
        const labs = accessLab.join(",");
        const url = `http://localhost:8800/report/check-out-in/${resource_id_temp}/${start_date_temp}/${end_date_temp}/${status}/${lab}/${labs}`;
        // console.log(url);
        const res = await axios.get(url);
        setDetails(res.data);
        // console.log(res.data);
      } catch (error) {
        console.log(error);
      } 
    }
    getDetails();
  };

  return (
    <div className="row mt-3">
      <div className="col ">
        <div className="form-floating mb-3 ">
          <input
            type="date"
            className="form-control"
            id="start_date"
            value={start_date}
            name="start_date"
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="start_date">Start Date</label>
        </div>
      </div>
      <div className="col ">
        <div className="form-floating mb-3">
          <input
            type="date"
            className="form-control"
            id="end_date"
            name="end_date"
            value={end_date}
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="end_date">End Date</label>
        </div>
      </div>
      <div className="col ">
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            id="resource_id"
            value={resource_id}
            name="resource_id"
            placeholder="Resource ID"
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="resource_id">Resource ID</label>
        </div>
      </div>
      <div className="col ">
        <div className="form-floating mb-3">
          <select
            className="form-select"
            name="lab"
            value={lab}
            onChange={(e) => handleChange(e)}
          >
            <option value="All">All</option>
            {accessLab.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <label htmlFor="status">Labs</label>
        </div>
      </div>
      <div className="col ">
        <div className="form-floating mb-3">
          <select
            className="form-select"
            name="status"
            value={status}
            onChange={(e) => handleChange(e)}
          >
            {statusList.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <label htmlFor="status">Status</label>
        </div>
      </div>
      <div className="col">
        <button
          className="btn btn-primary btn-sm"
          onClick={(e) => handleForm(e)}
        >
          Search
        </button>
      </div>
     <TableReport details ={details}/>
    </div>
  );
}

export default CheckOutInReport