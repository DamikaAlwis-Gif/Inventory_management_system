import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import TableMore from "./TableMore";
import Button from "@mui/material/Button";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material';
import {base_url} from '../../config';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const MoreDetailsPub = () => {
  const [details, setDetails] = useState({});
  const { id } = useParams();
  const [ok, setok] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchAllDetailsByID = async (id) => {
      try {
        const res = await axios.get(`${base_url}/resources/usermore/` + id);
        
        if (res.data && res.data.length > 0) {
          setDetails(res.data[0]);
          //console.log(res.data[0]);
          setLoaded(true);
        } else {
          setok(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllDetailsByID(id);
  }, []);

  const navigate = useNavigate();
  
  const handleReserve = async (e,id) => {
    try {
      e.preventDefault();
     // const res = await axios.delete(`${base_url}/resources/` + id);
      console.log("Redirected to reservation data page!");
      navigate(`/reserve/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    { loaded } && (
      <div>
        {ok ? (
          <div>
            <Typography
              variant="h4"
              gutterBottom
              mb={4} 
              align="center"
              style={{color: '#ffffff', padding: "20px 0px 10px 0px"}}>
                More Details
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
                </ThemeProvider>
                </div>
                <Paper sx={{ padding: "5px", marginTop: "100px" }} elevation={4}>
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
    )
  );
};

export default MoreDetailsPub;
