import React from 'react';
import { useState } from 'react';
import Paper from "@mui/material/Paper";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import {
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";
const Users = () => {
   const [userType, setUserType] = useState("");
   const userTypes = [
     "All",
     "Student",
     "Office Clerk",
     "Academic Staff Member",
     "Technical Officer",
   ];
   const [users, setUsers] = useState([]);
   const [accessList, setAccessList] = useState([]); // array of access names 
   const [userID, setUserID] = useState("");
   const [accessLoaded, setAccessLoaded] = useState(false); // access has loaded or not


  
    const handleChange = (e) => {
      const value = e.target.value;
      const getUsersbyType = async () => {
        try {
          const res = await axios.get(
            `http://localhost:8800/access/users/${value}`
          );
          console.log(res.data);
          setUsers(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      if(value !== "" ){
        setUserType(value);
       getUsersbyType();

      }
      
    };
    const handleClick = (e, user_id) => {
      e.preventDefault();
      console.log("clicked");
      const getAccessofuser = async () => {
        try {
          setUserID(user_id);
          const res = await axios.get(
            `http://localhost:8800/access/view/${user_id}`
          );
          console.log(res.data);
          setAccessList(res.data);
          setAccessLoaded(true);
        } catch (error) {
          console.log(error);
        }
      }
      getAccessofuser();
    };

   
  return (
    <div className="container">
      <h1 className="text-center">Users</h1>
      <div className="mt-2">
        <div className="col-md-3">
          <Paper elevation={2} sx={{ maxWidth: 220 }}>
            <div className="form-floating mb-3 ">
              <select
                id="user_id"
                type="text"
                className="form-select"
                value={userType}
                onChange={(e) => handleChange(e)}
                placeholder="Select user type"
              >
                <option value="" disabled>
                  Choose
                </option>
                {userTypes.map((userType) => {
                  return (
                    <option key={userType} value={userType}>
                      {userType}
                    </option>
                  );
                })}
              </select>

              <label htmlFor="user_id">Select a user type</label>
            </div>
          </Paper>
        </div>
        {users.length !== 0 ? (
          <div className="row">
            <div className="col-md">
              <Paper elevation={5} sx={{ padding: 1 }}>
                <TableContainer sx={{ maxHeight: 375 }}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>{"User ID"}</TableCell>
                        <TableCell>{"Name"}</TableCell>
                        <TableCell>{"Actions"}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.map((user) => {
                        return (
                          <TableRow key={user.user_id}>
                            <TableCell>{user.user_id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                size="small"
                                onClick={(e) => handleClick(e, user.user_id)}
                              >
                                Access control
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </div>
            <div className="col-md">
              {/* {accessList.length === 0 && accessLoaded && (
              <div className="text-center" style={{ fontWeight: "bold" }}>
                The user has no access to the labs
              </div>
            )} */}
              {accessLoaded && (
                <Paper elevation={5} sx={{ padding: 1 }}>
                  <div className="text-center ">User ID: {userID}</div>
                  <div>
                    <Button
                      variant="contained"
                      size="small"
                      color="success"
                      startIcon={<AddIcon />}>
                      Add
                    </Button>
                  </div>
                  <TableContainer sx={{ maxHeight: 375 }}>
                    <Table stickyHeader size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>{"Lab name"}</TableCell>
                          <TableCell>{"Actions"}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {accessList.map((access) => {
                          return (
                            <TableRow key={access.name}>
                              <TableCell>{access.name}</TableCell>
                              <TableCell>
                                <IconButton color="error">
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                        <TableRow></TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              )}
            </div>
          </div>
        ) : (
          <div className=" text-center" style={{ fontSize: 30 }}>
            Select a user type to search!
          </div>
        )}
      </div>
    </div>
  );
}

export default Users