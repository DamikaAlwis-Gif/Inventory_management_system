import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function createData(name, id, lab, activity, due) {
  return { name, id, lab, activity, due };
}

const rows = [
  createData('Printer HP Laser', '10034', 'Comp. Lab 02', 'Reservation', '15/09/2023'),
  createData('Laptop Asus Vivobook', '21045', 'Advanced Lab', 'Check-in', '17/09/2023'),
  createData('Headphones JBL Wired', '12298', 'Network Lab', 'Maintenance', '18/09/2023'),
  createData('Heaphones Sony Wireless', '12267', 'Network Lab', 'Maintenance', '18/09/2023'),
  createData('Router Cisco', '10397', 'IoT Lab', 'Reservation', '19/09/2023'),
];

export default function DenseTable() {
  return (
    <>
    <Typography variant="body1"><strong>Upcoming Events</strong></Typography>
    <TableContainer component={Paper}>
      <Table sm={{ minWidth: 600 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">Lab</TableCell>
            <TableCell align="right">Activity</TableCell>
            <TableCell align="right">Due</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.lab}</TableCell>
              <TableCell align="right">{row.activity}</TableCell>
              <TableCell align="right">{row.due}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </>
  );
}
