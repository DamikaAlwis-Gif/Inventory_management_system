import React from 'react'
import { formatDate } from '../utils/formatDate';
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
const TableReport = (props) => {
    const {details , columns} = props;
    const dates = ["start_date", "end_date", "check_out_datetime", "due_datetime", "check_in_datetime", "completion_date"]

console.log(details);
  return (
    <div className="mt-2">
        
      <Paper elevation={5}> 
      <TableContainer sx={{ maxHeight: 375 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow > 
              {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
           {details && details.map((row) => {
              return (
                <TableRow hover key={row[columns[0].id]}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id}>
                        {dates.includes(column.id) ? formatDate(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
           } )}
          </TableBody>
        </Table>
      </TableContainer>
      </Paper>  
      
      
    </div>
  );
}

export default TableReport