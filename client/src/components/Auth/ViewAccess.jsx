import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import axios from "axios";
import React from "react";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import url from "../utils/configure";

const ViewAccess = () => {
    const [user_id, setuser_id] = useState("");
    const [accessList, setAccessList] = useState([]); // array of access names
    const [accessLoaded, setAccessLoaded] = useState(false); // access has loaded or not
    const handleChange = (e) => {
    const value = e.target.value;
    setuser_id(value);

    };
    const handleSearch = (e) => { 
        e.preventDefault();
        const getAccessofuser = async () => {
          try {
            
            const res = await axios.get(
              url.API_URL + `/access/view/${user_id}`
            );
            console.log(res.data);
            setAccessList(res.data);
            setAccessLoaded(true);

          } catch (error) {
            console.log(error);
          }
          
        }
        getAccessofuser();
        
        
    }
  return (
    <div>
      <h1 className="text-center"> View Access</h1>

      <div className="row ">
        <div className="col-md-5 mx-auto border">
          <div className="row">
            <div className="col-md mx-auto">
              <Paper elevation={2}>
                <div className="form-floating mb-3 ">
                  <input
                    id="user_id"
                    type="text"
                    className="form-control"
                    value={user_id}
                    onChange={(e) => handleChange(e)}
                    placeholder="Type user ID to search"
                  />
                  <label htmlFor="user_id">Type something to search</label>
                </div>
              </Paper>
            </div>
            <div className="col-md mx-auto">
              <Button
                variant="contained"
                size="small"
                onClick={(e) => handleSearch(e)}
                disabled={user_id === ""}
              >
                search
              </Button>
            </div>
          </div>
          {accessList && accessLoaded && (
            <div className="row">
              <div>
                <Button
                  variant="contained"
                  size="small"
                  color="success"
                  startIcon={<AddIcon />}
                >
                  Add
                </Button>
              </div>

              {accessList.length === 0 ? (
                <div className="text-center" style={{ fontWeight: "bold" }}>
                  No access found
                </div>
              ) : (
                <div className="col-md mx-auto ">
                  <table className="table">
                    <tbody>
                        {accessList.map((item) => {
                          return (
                            <tr>
                              <td>{item.name}</td>
                              <td>
                                <IconButton color="error">
                                  <DeleteIcon />
                                </IconButton>
                              </td>
                            </tr>
                          );
                        })}
                      
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAccess;
