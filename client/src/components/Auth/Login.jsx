import React from "react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";
import { validateProperty , validate } from "../Validation/LoginValidation";

import loginImage from "../../Images/LoginImage.jpg";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { createTheme, ThemeProvider } from '@mui/material';

import {base_url} from '../../config';
//const url= config.url;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Login = () => {

  const [value, setValue] = useState({
    user_name: "",
    password: "",
  });
  axios.defaults.withCredentials = true;
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const errorslist = { ...errors };
    const error =validateProperty(e.target);
    
    if (error) errorslist[e.target.name] = error;
    else delete errorslist[e.target.name];

    setErrors(errorslist);
    setValue({ ...value, [e.target.name]: e.target.value }); 
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(value);
    setErrors(errors || {});
    if (errors) return;

    try {
     
      const res = await axios.post(`${base_url}/auth/login`, value);
      //console.log(res.data);
      if (res.data.status === "ok") {
        navigate("/dashboard");
      } else {
        alert(res.data.err); // database error maybe
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  console.log(value)
  
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: 'flex',
        height: '100vh',
        width: '75%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '30px',

        '@media (max-width:1400px)': {width: '80%',},
        '@media (max-width:1300px)': {width: '85%',},
        '@media (max-width:1200px)': {width: '90%',},
        '@media (max-width:1100px)': {width: '95%',},
        '@media (max-width:1000px)': {width: '100%',},
        '@media (max-width:899.5px)': {
          width: '55%',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
        },
        '@media (max-width:850px)': {width: '60%',},
        '@media (max-width:800px)': {width: '65%',},
        '@media (max-width:750px)': {width: '70%',},
        '@media (max-width:700px)': {width: '75%',},
        '@media (max-width:650px)': {width: '80%',},
        '@media (max-width:600px)': {width: '85%',},
        '@media (max-width:550px)': {width: '90%',},
        '@media (max-width:500px)': {width: '99%',},
      }}
    >
    <Paper 
      elevation={5}
      sx={{
        padding: '8% 8% 8% 8%',
        borderRadius: '30px'
      }}>
    
      <Grid container alignItems="center" justifyContent="center" rowSpacing={3}>
        <Grid item container sx={12} md={7} alignItems="center" justifyContent="center">
          <img src={loginImage} alt="Image" style={{
                maxWidth: '100%',
                // maxHeight: '70vh',
          }}/>
        </Grid>
        <Grid item container sx={12} md={5} alignItems="center" justifyContent="center">
        <form noValidate onSubmit={(e) => handleSubmit(e)}>
          <Grid container rowSpacing={4} justifyContent="center" alignItems="center" sx={{ maxWidth: '380px', minWidth: '260px'}}>
            <Grid item xs={12} sx={{marginTop: '1rem', marginBottom: '0.5rem'}}>
              <Typography
                variant="h5"
                gutterBottom
                align="center"
                style={{color: '#252652'}}>
                  Log In to the Inventory MIS
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="username-input"
                label="Username"
                variant="outlined"
                fullWidth
                type="text"
                autoComplete="off"
                name="user_name"
                value={value.user_name}
                onChange={(e) => handleChange(e)}
                error={!!errors.user_name}
                helperText={errors.user_name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password-input"
                label="Password"
                variant="outlined"
                fullWidth
                type="password"
                name="password"
                value={value.password}
                onChange={(e) => handleChange(e)}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>

          <ThemeProvider theme={darkTheme}>
          {/* <Button onClick={() => navigate("/register")} type="button" variant="text" color="secondary" sx={{
            borderRadius: '20px',
            height: '40px',
            textTransform: 'capitalize',
          }}>Create Account</Button> */}
          <Button type="submit" variant="contained" color="secondary"  sx={{
            borderRadius: '20px',
            height: '40px',
            textTransform: 'capitalize',            
          }}>Log in</Button>
          </ThemeProvider>
        </Grid>
          </Grid>
        </form>
        </Grid>
      </Grid>
      </Paper>
    </Container>
  );
};

export default Login;
