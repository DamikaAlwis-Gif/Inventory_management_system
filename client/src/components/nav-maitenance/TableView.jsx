import React from "react";
import { useState, useEffect } from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TableView = (props) => {
  const { details,onClickMore } = props;

  const [showComplete, setShowComplete] = useState(false);

  const handleRadioChange = () => {
    // Toggle the value of isChecked when the radio button changes
    setShowComplete(!showComplete);
  };

  return (
    <>
      <div>
        <label style={{color: 'black'}}>
          <input
            type="radio"
            value="true"
            checked={showComplete === false}
            onChange={handleRadioChange}
          />
          &nbsp; Incomplete &nbsp; &nbsp;
        </label>
        <label style={{color: 'black'}}>
          <input
            type="radio"
            value="false"
            checked={showComplete === true}
            onChange={handleRadioChange}
          />
          &nbsp; Complete
        </label>
        <br/>
        <br/>
      </div>

      <div>

        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 4 }}>
          <Table sm={{ minWidth: 600 }} size="medium">
            <TableHead>
              <TableRow>
                <TableCell><strong>Resource</strong></TableCell>
                <TableCell align="right"><strong>Type</strong></TableCell>
                <TableCell align="right"><strong>Starting Time</strong></TableCell>
                <TableCell align="right"><strong>Ending Time</strong></TableCell>
                <TableCell align="right"><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {details.filter((mt) => showComplete ? mt.status === "Done" : mt.status === "Undone").map((mt) => (
                <TableRow
                  key={mt.maintenance_id}
                  onClick={(e) => onClickMore(e, mt.maintenance_id)}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                  {mt.resource_id}
                  </TableCell>
                  <TableCell align="right">{mt.maintenance_type}</TableCell>
                  <TableCell align="right">{mt.start_date}</TableCell>
                  <TableCell align="right">{mt.completion_date}</TableCell>
                  <TableCell align="right">{mt.status === "Undone" ? "Incomplete" : "Complete"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <h5 style={{marginTop: 15, color: "black"}}>Click on rows to change the maintenance status</h5>
      </div>
    </>
  );
};

export default TableView;
