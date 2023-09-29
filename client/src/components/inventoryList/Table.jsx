import React from "react";
import { Paper,TableContainer,Table, TableHead, TableRow, TableCell, TableBody, Button ,TablePagination} from "@mui/material";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import ReadMoreIcon from "@mui/icons-material/ReadMore";

const TableRessources = (props) => {
  const { resources  , onClickMore } = props;
  const [page, setPage] = useState(0);
  const[rowsPerPage, setRowsPerPage] = useState(10);
  if (resources.length === 0) {
    return (
      <div className="container text-center p-5">
        <p className="display-6 ">No resources found!</p>
      </div>
    );
  }
  
  const columns = [
    {id: 'resource_id', label: 'Resource ID' },
    {id: 'name', label: 'Name' },
    {id: 'resource_type', label: 'Type' },
    {id: 'lab_name', label: 'Lab' },
    {id: 'availability', label: 'Availability' },]
 
  const handleChangePage = (e,newPage) => {
    e.preventDefault();
    setPage(newPage);
  }
  const handleChangeRowsPerPage = (e) => {
    e.preventDefault();
    setRowsPerPage(+e.target.value);
    setPage(0);
  }
  if(resources.length < page * rowsPerPage ){
    setPage(0);
  }

  const handleColor = (availability) => {
    if(availability === "Available"){
      return "badge bg-success rounded-pill";
  }
  else if(availability === "Checked out" || availability === "Under maintenance" ){
    return "badge bg-warning rounded-pill";
  }

  
  else return "badge bg-danger rounded-pill";
}
  
    return (
      <div>
        <Paper elevation={4}>
          <TableContainer sx={{ maxHeight: 375 }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      sx={{
                        fontSize: "16px",
                        fontWeight: "bold",
                       
                        padding: "10px",
                      }}
                      key={column.id}
                      
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell
                    sx={{
                      fontSize: "16px",
                      fontWeight: "bold",
                     
                      padding: "10px",
                    }}
                  
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {resources &&
                  resources
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((resource, i) => (
                      <TableRow key={i} hover={true} >
                        {columns.map((column) => (
                          <TableCell key={column.id} >
                            {column.id === "availability" ? (
                              <span
                                className={handleColor(resource[column.id])}
                              >
                                {resource[column.id]}
                              </span>
                            ) : (
                              resource[column.id]
                            )}
                          </TableCell>
                        ))}
                        <TableCell>
                          <IconButton
                            onClick={(e) =>
                              onClickMore(e, resource.resource_id)
                            }
                          >
                            <ReadMoreIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            page={page}
            rowsPerPage={rowsPerPage}
            count={resources.length}
            component="div"
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          ></TablePagination>
        </Paper>
      </div>
    );
};

export default TableRessources;
