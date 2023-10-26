import React from 'react'
import { formatDate } from '../utils/formatDate';
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import jsPDF from "jspdf";
import "jspdf-autotable";
import IconButton from "@mui/material/IconButton";
import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";

const TableReport = (props) => {
    const {details , columns} = props;
    const dates = ["start_date", "end_date", "check_out_datetime", "due_datetime", "check_in_datetime", "completion_date"];

    const downloadPDF = (e) => {
      e.preventDefault();
      const doc = new jsPDF();
      let tableHeaders = columns.map((item) => item.label);
      let tableContent = details.map((item) => {
        let temp = columns.map((column) => {
        
          if (dates.includes(column.id)) {
             return formatDate(item[column.id]);
          }
          return item[column.id].toString();
        });
        return temp
      });
      doc.autoTable({
        styles: { fontSize: 8 },
        margin: { top: 10 },
        head: [tableHeaders],
        body: tableContent,
      });
      doc.save("report.pdf");
    };


console.log(details);
  return (
    <div className="mt-3"> 
      <Paper elevation={5}> 
      <IconButton onClick={(e) => downloadPDF(e)}>
        <LocalPrintshopRoundedIcon />
      </IconButton>
      <TableContainer sx={{ maxHeight: '50vh' }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow > 
            {columns.map((column) => {
            return <TableCell key={column.id}>{column.label}</TableCell>;}
                )}
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
