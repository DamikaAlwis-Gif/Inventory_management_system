import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {base_url} from '../../config';

const AdminReserView=()=>{
  
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchReservData = async () => {
      try {
        const res = await axios.get(`${base_url}/reservations/all/` );
         if (res.data && res.data.length > 0) {
          setDetails(res.data);
        } else {
          console.log("data error");
        }
      } catch (error) {
        console.log(error);
        
      }
    };
    fetchReservData();
  }, []);

    return(
        <div className="container">
          <Typography
            variant="h4"
            gutterBottom
            mb={4} 
            align="center"
            style={{color: '#ffffff', padding: "20px 0px 10px 0px"}}>
              Reservations
          </Typography>

          <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 4 }}>
          <Table sm={{ minWidth: 600 }} size="medium">
            <TableHead>
              <TableRow>
                <TableCell><strong>User</strong></TableCell>
                <TableCell align="right"><strong>Resource</strong></TableCell>
                <TableCell align="right"><strong>Start Date</strong></TableCell>
                <TableCell align="right"><strong>End Date</strong></TableCell>
                <TableCell align="right"><strong>Status</strong></TableCell>
                <TableCell align="right"><strong>Purpose</strong></TableCell>
                <TableCell align="right"><strong>Type</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {details.map((mt) => (
                <TableRow
                  key={mt.reservation_id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                  {mt.user_id}
                  </TableCell>
                  <TableCell align="right">{mt.resource_id}</TableCell>
                  <TableCell align="right">{mt.start_date}</TableCell>
                  <TableCell align="right">{mt.end_date}</TableCell>
                  <TableCell align="right">{mt.status}</TableCell>
                  <TableCell align="right">{mt.purpose}</TableCell>
                  <TableCell align="right">{mt.reservation_type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* <table className="table table-primary table-hover table-responsive  ">
          <thead className=" ">
            <tr>
                
              <th>User</th>
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
               <td>{mt.user_id}</td>
               <td>{mt.resource_id}</td>
                <td>{mt.start_date}</td>
                <td>{mt.end_date}</td>
                <td>{mt.status}</td>
                <td>{mt.purpose}</td>
                <td>{mt.reservation_type}</td>
              </tr>
            ))}         
          </tbody>
        </table> */}
      </div>
    );
};
 export default AdminReserView;
