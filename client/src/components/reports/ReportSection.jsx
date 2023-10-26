import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import Report from './Report'
import Typography from '@mui/material/Typography';
import {base_url} from '../../config';

const ReportSection = () => {
    const [selectedRadio, setSelectedRadio] = useState("check_in_check_out"); // Initialize with the ID of the initially checked radio button
    const [details, setDetails] = useState([]);
    const [accessLab, setAccessLab] = useState([]);
    const [formDetails, setFormDetails] = useState({
      resource_id: "",
      start_date: "",
      end_date: "",
      status: "All",
      lab: "All",
    });
    const [columns, setColumns] = useState([]);
    const [statusList, setStatusList] = useState([]);

    axios.defaults.withCredentials = true;
    const handleRadioChange = (event) => {
      setSelectedRadio(event.target.id);
    };
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormDetails((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
    const { resource_id, start_date, end_date, status, lab } = formDetails;

    const handleForm = (e) => {
      e.preventDefault();

      const getDetails = async () => {
        try {
          let resource_id_temp = resource_id;
          let start_date_temp = start_date;
          let end_date_temp = end_date;

          if (resource_id === "") {
            resource_id_temp = "All";
          }

          if (start_date === "") {
            start_date_temp = "All";
          }
          if (end_date === "") {
            end_date_temp = "All";
          }
          const labs = accessLab.join(",");
          const url =
            `${base_url}/report/` +
            selectedRadio +
            `/${resource_id_temp}/${start_date_temp}/${end_date_temp}/${status}/${lab}/${labs}`;
          console.log(url);
          // console.log(url);
          const res = await axios.get(url);
          setDetails(res.data);
          // console.log(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      getDetails();
    };
    const columnsArray = {
      reservation: [
        { id: "reservation_id", label: "Reservation ID" },
        { id: "resource_id", label: "Resource ID" },
        { id: "name", label: "Resource Name" },
        { id: "user_id", label: "User ID" },
        { id: "lab_name", label: "Lab name" },
        { id: "status", label: "Status" },
        { id: "start_date", label: "Reservation date time" },
        { id: "end_date", label: "End date time" },
        { id: "purpose", label: "Purpose" },
        { id: "reservation_type", label: "Type" },
      ],
      check_in_check_out: [
        { id: "check_in_out_id", label: "Check-in-out ID" },
        { id: "resource_id", label: "Resource ID" },
        { id: "name", label: "Resource Name" },
        { id: "user_id", label: "User ID" },
        { id: "lab_name", label: "Lab name" },
        { id: "status", label: "Status" },
        { id: "check_out_datetime", label: "Check-out date time" },
        { id: "due_datetime", label: "Due date time" },
        { id: "check_in_datetime", label: "Check-in date time" },
      ],
      maintenance: [
        { id: "maintenance_id", label: "Maintenance ID" },
        { id: "resource_id", label: "Resource ID" },
        { id: "name", label: "Resource Name" },
        { id: "lab_name", label: "Lab name" },
        { id: "status", label: "Status" },
        { id: "start_date", label: "Start date time" },
        { id: "completion_date", label: "Completion date time" },
      ],
    };
    const statusListArray = {
      reservation: ["All", "Due", "Checked-out"],
      check_in_check_out: ["All", "Checked-out", "Checked-in", "Overdue"],
      maintenance: ["All", "Done", "Undone"],
    };
  

    useEffect(() => {
      const getLabs = async () => {
        try {
          const res = await axios.get(`${base_url}/auth/access`);
          
          const list = res.data.map((item) => item.name);
          setAccessLab(list);
        } catch (error) {
          console.log(error);
        }
      };
      getLabs();
    }, []);

    useEffect(() => {
      const setReportDetails = () =>{
        setColumns(columnsArray[selectedRadio]);
        setStatusList(statusListArray[selectedRadio]);
        setDetails([]);
        setFormDetails({
          resource_id: "",
          start_date: "",
          end_date: "",
          status: "All",
          lab: "All",
        });
        
      }
      setReportDetails();

    }, [selectedRadio]);

    

    
  return (
    <div>
      <Typography
        variant="h4"
        gutterBottom
        mb={4} 
        align="center"
        style={{color: '#ffffff', padding: "20px 0px 10px 0px"}}>
          Reports
      </Typography>
      <div className="container">
        <div >
          <Link to="/analytics">Analytics</Link>
        </div>
        <div className="mt-2">
          <div className="btn-group btn-group-sm " role="group">
            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="reservation"
              autoComplete="off"
              checked={selectedRadio === "reservation"}
              onChange={handleRadioChange}
            />
            <label className="btn btn-outline-light" htmlFor="reservation">
              Reservation
            </label>

            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="check_in_check_out"
              autoComplete="off"
              checked={selectedRadio === "check_in_check_out"}
              onChange={handleRadioChange}
            />
            <label
              className="btn btn-outline-light"
              htmlFor="check_in_check_out"
            >
              Check-in/Check-out
            </label>

            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="maintenance"
              autoComplete="off"
              checked={selectedRadio === "maintenance"}
              onChange={handleRadioChange}
            />
            <label className="btn btn-outline-light" htmlFor="maintenance">
              Maintenance
            </label>
          </div>
          
          <Report
            statusList={statusList}
            details={details}
            columns={columns}
            formDetails={formDetails}
            accessLab={accessLab}
            handleChange={handleChange}
            handleForm={handleForm}
          ></Report>
        </div>
      </div>
    </div>
  );
}

export default ReportSection
