import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams ,Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import TableMore from "./TableMore";
import Button from "@mui/material/Button";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

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
          <Typography
            variant="h5"
            gutterBottom
            mb={3}
            mt={4}
            align="center"
            style={{color: '#252652', padding: "20px 0px 10px 0px"}}>
              <strong>More Details</strong>
          </Typography>
          <div className="container">
            <div className="row">
              <div className="col-md">
              <div className="col g-0" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <ThemeProvider theme={darkTheme}>
                  <Button
                    onClick={() => navigate("/resources")}
                    variant="contained"
                    size="medium" 
                    sx={{
                      borderRadius: '18px',
                      height: '36px',
                      textTransform: 'capitalize',
                      marginRight: "10px",
                      backgroundColor: "#ce93d8"}}
                  >
                    {`<< Back to Resources`}
                  </Button>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Button
                    onClick={(e) => handleUpdate(e)}
                    variant="contained"
                    color="success"
                    size="medium"
                    sx={{
                      borderRadius: '18px',
                      height: '36px',
                      textTransform: 'capitalize',
                      marginRight: "10px"}}
                  >
                    Update
                  </Button>
                  <Button
                    onClick={(e) => handleDelete(e, id)}
                    variant="contained"
                    color="error"
                    size="medium"
                    sx={{
                      borderRadius: '18px',
                      height: '36px',
                      textTransform: 'capitalize',
                      marginRight: "10px"}}
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={(e) => handleReserve(e, id)}
                    variant="contained"
                    size="medium"
                    sx={{
                      borderRadius: '18px',
                      height: '36px',
                      textTransform: 'capitalize',
                      marginRight: "10px"}}
                  >
                    Reserve
                  </Button>
                  <Button
                    onClick={(e) => handleMaintenance(e, id)}
                    variant="contained"
                    size="medium"
                    sx={{
                      borderRadius: '18px',
                      height: '36px',
                      textTransform: 'capitalize'}}
                  >
                    Schedule Maintenance
                  </Button>
                  </div>
                </ThemeProvider>
                </div>
                <Paper sx={{ padding: "5px", marginTop: "30px" }} elevation={4}>
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
