import * as React from 'react';
import { useState, useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { set } from 'react-hook-form';

export default function DenseTable({ role, data }) {

  const [tableData, setTableData] = useState([]);

  // function createData(name, id, lab, activity, due) {
  //   return { name, id, lab, activity, due };
  // }
  // const rows = [
  //   createData('Printer HP Laser', '10034', 'Comp. Lab 02', 'Reservation', '15/09/2023'),
  //   createData('Laptop Asus Vivobook', '21045', 'Advanced Lab', 'Check-in', '17/09/2023'),
  //   createData('Headphones JBL Wired', '12298', 'Network Lab', 'Maintenance', '18/09/2023'),
  //   createData('Heaphones Sony Wireless', '12267', 'Network Lab', 'Maintenance', '18/09/2023'),
  //   createData('Router Cisco', '10397', 'IoT Lab', 'Reservation', '19/09/2023'),
  //   createData('Cable HDMI Baseus', '24112', 'IoT Lab', 'Reservation', '19/09/2023'),
  //   createData('Desktop Computer', '00098', 'Comp. Lab 01', 'Reservation', '20/09/2023'),
  // ];

  useEffect(() => {
    setTableData(data);
    console.log(data);
    console.log(tableData);
  }, [data]);


  return (
    <>
    <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 4, maxHeight: 350 }}>
      <Table sm={{ minWidth: 600 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell colSpan={5} align="center">
              {role === 'tech' ? 
                <h6><strong>Upcoming Events</strong></h6>
              :
                <h6><strong>Upcoming Reservations & Due Check-ins</strong></h6>
              }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell align="right"><strong>ID</strong></TableCell>
            <TableCell align="right"><strong>Lab</strong></TableCell>
            <TableCell align="right"><strong>Activity</strong></TableCell>
            <TableCell align="right"><strong>Due</strong></TableCell>
          </TableRow>
        </TableHead>

        {tableData.length !== 0 && <TableBody>
          {tableData.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.resource_id}</TableCell>
              <TableCell align="right">{row.lab_name}</TableCell>
              <TableCell align="right">{row.activity}</TableCell>
              <TableCell align="right">{row.due}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        }
      </Table>
      {tableData.length === 0 && <Typography
      variant="h5"
      gutterBottom
      mb={5}
      mt={5}
      align="center"
      style={{color: 'black', padding: "20px 0px 10px 0px"}}>
        {role === 'tech' ? 
          <h4>No Upcoming Events!</h4>
        :
          <h4>You have no upcoming reservations or due check-ins!</h4>
        }
    </Typography>}
    </TableContainer>

    </>
  );
}
