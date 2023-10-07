import * as React from 'react';
import { NAVBAR_HEIGHT } from '../../constants';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import CustomDateTimePicker from './CustomDateTimePicker';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import Paper from '@mui/material/Paper';
import { useForm, FormProvider } from 'react-hook-form';
// import { DevTool } from '@hookform/devtools';
import axios from 'axios';


export default function CheckIn() {

  const methods = useForm();
  const { register, formState, control, reset } = methods;
  const { errors } = formState;

  const [checkinDatetime, setCheckinDatetime] = useState(dayjs());

  const [displayMessage, setDisplayMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [open, setOpen] = useState(false);
  const [userIdError, setUserIdError] = useState(true);

  const formattedCheckinDatetime = checkinDatetime.format('YYYY-MM-DD HH:mm:00');

  const onSubmit = (data) => {
    setDisplayMessage("");

    const formData = {
      userId: data.userId,
      resourceId: data.resourceId,
      checkinDatetime: formattedCheckinDatetime,
      status: "Checked-in",
    }
    const formDataJSON = JSON.stringify(formData);
    console.log(formDataJSON);

    const url = 'http://localhost:8800/checkin';

    axios.post (url, formDataJSON, {
      headers: {
        'Content-Type': 'application/json'
      }
    }) .then (response => {
      console.log("Response: ", response.data);
      
      setDisplayMessage(
        <span>
          <strong>Resource ID: {data.resourceId}</strong> successfully checked-in by <strong>User ID: {data.userId}</strong> 
        </span>);
      setMessageType("success");
      reset();

    }) .catch (error => {
      // if the item is already recorded as checked out
      if (error.response.status === 409) {
        setMessageType("error");
      // if there is a scheduled maintenance or reservation shortly
      } else if (error.response.status === 490) {
        setMessageType("warning");
      } else {
        setMessageType("info")
      }

      if (error.response.data.message) {
        setDisplayMessage(<span><strong>{error.response.data.message}</strong></span>);
      } else {
        setDisplayMessage("An error occurred.");
      }
    });
    setOpen(true);
  };

  useEffect(() => {
    if (setOpen) {
      const timeout = setTimeout(() => {
        setOpen(false)
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [displayMessage]);

  const navigate = useNavigate();

  return (
    <>
    <Typography
      variant="h4"
      gutterBottom
      mb={0} 
      align="center"
      style={{color: '#ffffff', padding: "20px 0px 10px 0px"}}>
        Check-in
    </Typography>
    <Container
      maxWidth="md"
      disableGutters={true}
      sx={{
        height: `calc(100vh - ${NAVBAR_HEIGHT}px - 71px)`,
        width: '55%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: `${NAVBAR_HEIGHT}px`,

        '@media (max-width:1700px)': {width: '40%',},
        '@media (max-width:1550px)': {width: '45%',},
        '@media (max-width:1300px)': {width: '50%',},
        '@media (max-width:1150px)': {width: '55%',},
        '@media (max-width:1000px)': {width: '65%',},
        '@media (max-width:850px)': {width: '70%',},
        '@media (max-width:750px)': {width: '80%',},
        '@media (max-width:650px)': {width: '88%',},
        '@media (max-width:500px)': {width: '90%',},
        '@media (max-width:460px)': {width: '95%',},
        '@media (max-width:420px)': {width: '98%',},
      }}
    >

    <Paper 
      elevation={4}
      sx={{
        padding: '8% 6% 8% 6%',
        borderRadius: '30px',
        // backgroundColor: '#f3e5f5'
      }}>
    <FormProvider {...methods}>
    <form noValidate onSubmit={methods.handleSubmit(onSubmit)}>
      <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2}}>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            style={{color: '#444444'}}>
              Check-in Details
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="userId"
            label="User ID"
            variant="outlined"
            fullWidth
            type="text"
            autoComplete="off"
            {...register('userId', {required: "User ID is required"})}
            error={userIdError && errors.userId}
            helperText={userIdError && errors.userId?.message}

            // disallow whitespaces and set the alphabetical characters in the User ID to Uppercase automatically
            onChange={(e) => {
              e.target.value = e.target.value.replace(/[\s]/g, '').toUpperCase();
              setUserIdError(e.target.value === '');
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="resourceId"
            label="Resource ID"
            variant="outlined"
            fullWidth
            type="text"
            autoComplete="off"
            {...register('resourceId', {required: "Resource ID is required"})}
            error={!!errors.resourceId}
            helperText={errors.resourceId?.message}

            // disallow whitespaces and set the alphabetical characters in the User ID to Uppercase automatically
            onChange={(e) => {
              e.target.value = e.target.value.replace(/[\s]/g, '').toUpperCase();
              setUserIdError(e.target.value === '');
            }}
          />
        </Grid>
        <Grid item xs={12}>
        <Divider variant="middle" />
        </Grid>
        <Grid item xs={12}>
          {/*The check-in date & time is set to the current time by default.
          The future dates are not availble to select. The past dates are made available presuming the need to enter a missed check-in record*/}
          <CustomDateTimePicker 
            selectedDateTime={checkinDatetime}
            onDateTimeChange={(newDateTime) => {
              setCheckinDatetime(newDateTime);
            }}
            customLabel={'Check-in Date & Time'}
            customDisablePast={false}
            customDisableFuture={true}
          />
        </Grid>
        <Grid item xs={12}>
        <Divider variant="middle" />
        </Grid>

        {/* Buttons */}
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>

          <Button onClick={() => navigate("/dashboard")} type="button" variant="contained" color="error" sx={{
            borderRadius: '22px',
            height: '44px',
            width: '84px',
            textTransform: 'capitalize',            
          }}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary" sx={{
            borderRadius: '22px',
            height: '44px',
            width: '84px',
            textTransform: 'capitalize'
          }}>Proceed</Button>
        </Grid>
      </Grid>

      <Snackbar open={open} anchorOrigin={{vertical:'bottom', horizontal:'center'}}>
          <Alert severity={messageType} sx={{ width: '100%' }}>
            {displayMessage}
          </Alert>
      </Snackbar>

    </form>
    </FormProvider>
    {/* <DevTool control={control} /> */}
    </Paper>
    </Container>
    </>
  )
}
