import React from "react";
import { useState, useEffect } from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const TableView = (props) => {
  const { details,onClickMore } = props;

  const [isChecked, setIsChecked] = useState(true);

  const handleRadioChange = () => {
    // Toggle the value of isChecked when the radio button changes
    setIsChecked(!isChecked);
  };

  return (
<>
    <div>
      <label style={{color: '#ffffff'}}>
        <input
          type="radio"
          value="true"
          checked={isChecked === true}
          onChange={handleRadioChange}
        />
        &nbsp; Show Undone &nbsp; &nbsp;
      </label>
      <label style={{color: '#ffffff'}}>
        <input
          type="radio"
          value="false"
          checked={isChecked === false}
          onChange={handleRadioChange}
        />
        &nbsp; Show completed
      </label>
     <br/>
     <br/>
    </div>


<div>
    {isChecked ? (
    <div> 
      <table className="table table-primary table-hover table-responsive  ">
        <thead className=" ">
          <tr>
          <th>Resource</th>
            <th>Type</th>
            <th>Starting</th>
            <th>Ending</th>
            <th>Status</th>
            
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {details.filter((mt) => mt.status == "Undone").map((mt) => (
            <tr key={mt.maintenance_id} 
            onClick={(e) => onClickMore(e, mt.maintenance_id)}
            >
                <td>{mt.resource_id}</td>
              <td>{mt.maintenance_type}</td>
              <td>{mt.start_date}</td>
              <td>{mt.completion_date}</td>
              <td>{mt.status}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
      <h6 style={{color: "white"}}>Click on rows to change the maintenance status</h6>
    </div>
    
    ):(
      <div>
      <table className="table table-primary table-hover table-responsive  ">
        <thead className=" ">
          <tr>
            <th>Resource</th>
            <th>Type</th>
            <th>Starting</th>
            <th>Ending</th>
            <th>Status</th>
            
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {details.filter((mt) => mt.status == "Done").map((mt) => (
            <tr key={mt.maintenance_id} >
            <td>{mt.resource_id}</td>
              <td>{mt.maintenance_type}</td>
              <td>{mt.start_date}</td>
              <td>{mt.completion_date}</td>
              <td>{mt.status}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    )}
          </div>
    </>
  );
};

export default TableView;
