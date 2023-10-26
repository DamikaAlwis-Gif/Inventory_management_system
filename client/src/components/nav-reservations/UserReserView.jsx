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

const UserReserView=()=>{
  const [details, setDetails] = useState([]);
  
 // const [user_name, setName] = useState("");

  useEffect(() => {
  
    const fetchReservData = async () => {
      try {
        const res = await axios.get(`${base_url}/reservations/myReservations/` );
         if (res.data && res.data.length > 0) {
          setDetails(res.data);
         // setName(res.data.name);
        
        } else {
          console.log("data error");
        }
      } catch (error) {
        console.log(error);
        
      }
    };
    fetchReservData();
  }, []);
 // console.log("name is:"+user_name);

    return(

      <div className="container">
        <Typography
          variant="h5"
          gutterBottom
          mb={3}
          mt={4}
          align="center"
          style={{color: '#252652', padding: "20px 0px 10px 0px"}}>
              <strong>My Reservations</strong>
        </Typography>

        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 4 }}>
          <Table sm={{ minWidth: 600 }} size="medium">
            <TableHead>
              <TableRow>
                <TableCell><strong>Resource</strong></TableCell>
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
                  key={mt.resource_id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {mt.resource_id}
                  </TableCell>
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
      </div>
    );
};
 export default UserReserView;
