import { Table, TableBody, TableHead, TableCell, TableRow, TableContainer } from "@mui/material";
import React from 'react'


const TableMore = (props) => {
    const {details} = props;
    const formatText = (text) => {
      const temp = text.replace(/_/g, " ");
      return temp.charAt(0).toUpperCase() + temp.slice(1);
    };

  return (
    <>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontWeight: "bolder", backgroundColor: "#cfe2ff" }}
              >
                Atttribute
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bolder", backgroundColor: "#cfe2ff" }}
              >
                Information
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(details).map(([key, value]) => {
              if (key === "img_url") return null;
              return (
                <TableRow key={key}>
                  <TableCell>{formatText(key)}</TableCell>
                  <TableCell>{value}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TableMore
