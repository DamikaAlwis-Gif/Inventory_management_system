import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams ,Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import TableMore from "./TableMore";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import { Button } from "@mui/material";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import Paper from '@mui/material/Paper';

const MoreDetails = () => {
  const [details, setDetails] = useState({});
  const { id } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [ok, setok] = useState(true);

  
  useEffect(() => {
    const fetchAllDetailsByID = async (id) => {
      try {
        const res = await axios.get("http://localhost:8800/resources/adminmore/" + id);
        // res.data checks not null or undefined
        // res.data.length checks length property of res.data is greater than 0.
        if (res.data && res.data.length > 0) {
          setDetails(res.data[0]);
          console.log(res.data[0]);
          setLoaded(true);
        } else {
          setok(false);
        }
      } catch (error) {
        console.log(error);
        console.log("HEllo error");
      }
    };
    fetchAllDetailsByID(id);
  }, []);

  const navigate = useNavigate();
  const handleDelete = (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleIsConfirmed(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleIsConfirmed = async (id) => {
    try {
      const res = await axios.delete("http://localhost:8800/resources/" + id);
      console.log("Resourse is deleted!");
      navigate("/resources");
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    navigate("/update/" + id);
  };

  const handleReserve = async (e,id) => {
    try {
      e.preventDefault();
     // const res = await axios.delete("http://localhost:8800/resources/" + id);
      console.log("Redirected to reservation data page!");
      navigate(`/Reserve/${id}`); 
    } catch (error) {
      console.log(error);
    }
  };

  const handleMaintenance = async (e,id) => {
    try {
      e.preventDefault();
      console.log("Redirected to maintenance page!");
      navigate(`/maintenance/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {ok && loaded ? (
        <div>
          <h1 className="text-center">More Details</h1>
          <div className="container">
            <div className="my-2">
              <Link to="/resources"> Resources</Link>
            </div>
            <div className="row">
              <div className="col-md">
                <Paper sx={{ padding: "5px" }} elevation={4} >
                  <Button
                    onClick={(e) => handleUpdate(e)}
                    variant="contained"
                    
                    size="small"
                    style={{ marginRight: "10px", backgroundColor: "#4caf50" ,}}
                    
                  >
                    Update
                  </Button>

                  <Button
                    onClick={(e) => handleDelete(e, id)}
                    variant="contained"
                    size="small"
                    color="error"
                    startIcon={<DeleteIcon />}
                    style={{ marginRight: "10px" }}
                    // sx={{ borderRadius: "15px" }}
                  >
                    Delete
                  </Button>


                

                  <Button
                    onClick={(e) => handleReserve(e, id)}
                    variant="contained"
                    size="small"
                    // startIcon={<ScheduleIcon />}
                    style={{ marginRight: "10px" }}
                    // sx={{ borderRadius: "15px" }}
                  >
                    Reserve
                  </Button>


                  <Button
                    onClick={(e) => handleMaintenance(e, id)}
                    variant="contained"
                    size="small"
                  >
                    Schedule Maintenance
                  </Button>

                 

                </Paper>
                <Paper sx={{ padding: "5px", marginTop: "5px" }} elevation={4}>
                  <div className="row g-0 ">
                    <div className="col-md-4 ">
                      <img
                        src={
                          details.img_url
                            ? details.img_url
                            : "https://via.placeholder.com/150"
                        }
                        alt="Resource Image"
                        className="img-fluid rounded border-4 mx-auto d-block"
                      />
                    </div>
                    <div className="col-md ">
                      <TableMore details={details} />
                    </div>
                  </div>{" "}
                </Paper>
              </div>
            </div>
            ;
          </div>
        </div>
      ) : (
        <div className="container text-center p-5">
          <p className="display-6 ">
            The asset with resource id {id} does not exist!
          </p>
        </div>
      )}
    </div>
  );
};

export default MoreDetails;
