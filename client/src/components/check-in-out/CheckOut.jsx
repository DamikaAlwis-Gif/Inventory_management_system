import * as React from 'react';
import { NAVBAR_HEIGHT } from '../../constants';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import CustomDateTimePicker from './CustomDateTimePicker';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useForm, FormProvider } from 'react-hook-form';
// import { DevTool } from '@hookform/devtools';
import axios from 'axios';

export default function CheckOut() {

  const methods = useForm();
  const { register, formState, control, reset } = methods;
  const { errors } = formState;

  const currentDate = dayjs();
  const defaultDueDate = currentDate.add(1, "day").hour(16).minute(0).second(0); 

  const [checkoutDatetime, setCheckoutDatetime] = useState(currentDate);
  const [dueDatetime, setDueDatetime] = useState(defaultDueDate);
  const [displayMessage, setDisplayMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const formattedCheckoutDatetime = checkoutDatetime.format('YYYY-MM-DD HH:mm:00');
  const formattedDueDatetime = dueDatetime && dueDatetime.format('YYYY-MM-DD HH:mm:00');
  const retDatetime = dueDatetime && dueDatetime.add(1, 'day').startOf('day').set('hour', 23);
  const formattedRetDatetime = retDatetime && retDatetime.format('YYYY-MM-DD 12:00:00');

  const onSubmit = (data) => {
    console.log(formattedRetDatetime);
    const formData = {
      userId: data.userId,
      resourceId: data.resourceId,
      checkoutDatetime: formattedCheckoutDatetime,
      dueDatetime: formattedDueDatetime,
      retDatetime: formattedRetDatetime,
      status: "checked-out",
      purpose: data.purpose
    }
    const formDataJSON = JSON.stringify(formData);
    console.log(formDataJSON);

    const url = 'http://localhost:8800/checkout';

    axios.post (url, formDataJSON, {
      headers: {
        'Content-Type': 'application/json'
      }
    }) .then (response => {
      console.log("Response: ", response.data);
      
      setDisplayMessage(
        <span>
          Check-out recorded for<br /><strong>User ID: {data.userId}</strong><br /><strong>Resource ID: {data.resourceId}</strong>
        </span>);
      setMessageType("success");
      reset();

    }) .catch (error => {
      if (error.response.data.message) {
        setDisplayMessage(error.response.data.message);
      } else {
        setDisplayMessage("An error occurred.");
      }
      setMessageType("error");
    });
  };

  const navigate = useNavigate();

  return (
<Container
      maxWidth="md"
      sx={{
        height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
        overflowY: 'auto',
        width: '45%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: `${NAVBAR_HEIGHT}px`,

        '@media (max-width:1700px)': {width: '25%',},
        '@media (max-width:1550px)': {width: '30%',},
        '@media (max-width:1350px)': {width: '35%',},
        '@media (max-width:1150px)': {width: '40%',},
        '@media (max-width:1000px)': {width: '45%',},
        '@media (max-width:850px)': {width: '50%',},
        '@media (max-width:750px)': {width: '55%',},
        '@media (max-width:700px)': {width: '60%',},
        '@media (max-width:650px)': {width: '65%',},
        '@media (max-width:550px)': {width: '70%',},
        '@media (max-width:500px)': {width: '80%',},
        '@media (max-width:460px)': {width: '90%',},
        '@media (max-width:420px)': {width: '95%',},
      }}
    >

    <FormProvider {...methods}>
    <form noValidate onSubmit={methods.handleSubmit(onSubmit)}>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2}}>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            style={{color: '#444444'}}>
              Check-out
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="filled-basic"
            label="User ID"
            variant="outlined"
            fullWidth type="text"
            {...register('userId', {required: "User ID is required"})}
            error={!!errors.userId}
            helperText={errors.userId?.message}/>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="filled-basic"
            label="Resource ID"
            variant="outlined"
            fullWidth
            type="text"
            {...register('resourceId', {required: "Resource ID is required"})}
            error={!!errors.resourceId}
            helperText={errors.resourceId?.message}/>
        </Grid>
        <Grid item xs={12}>
        <Divider variant="middle" />
        </Grid>
        <Grid item xs={12}>
          {/*The check-out date & time is set to the current time by default.
          The future dates are not availble to select. The past dates are made available presuming the need to enter a missed check-out record*/}
          <CustomDateTimePicker 
            selectedDateTime={checkoutDatetime}
            onDateTimeChange={(newDateTime) => {
              setCheckoutDatetime(newDateTime);
            }}
            customLabel={'Check-out Date & Time'}
            customDisablePast={false}
            customDisableFuture={true}
          />
        </Grid>
        <Grid item xs={12}>
          {/*The due date & time is set to 4PM on the next day at the moment of initial render.
          The past dates are not available to select. The minute dial has been restricted to only "00" and "30" to make the due time practical.*/}
          <CustomDateTimePicker 
            selectedDateTime={dueDatetime}
            onDateTimeChange={(newDateTime) => {
              setDueDatetime(newDateTime);
            }}
            customLabel={'Due Date & Time'}
            customDisablePast={true}
            customDisableFuture={false}
            customMinutesStep="30"
          />
        </Grid>
        <Grid item xs={12}>
        <Divider variant="middle" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-multiline-flexible"
            label="Purpose"
            multiline
            maxRows={4}
            fullWidth
            type="text"
            {...register('purpose', {required: "Purpose is required"})}
            error={!!errors.purpose}
            helperText={errors.purpose?.message}
          />
        </Grid>

      {/* Buttons */}
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          <Button onClick={() => navigate("/dashboard")} type="button" variant="contained" color="error" sx={{
            borderRadius: '20px',
            height: '40px',
            textTransform: 'capitalize',
          }}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary" sx={{
            borderRadius: '20px',
            height: '40px',
            textTransform: 'capitalize',            
          }}>Proceed</Button>
        </Grid>
      </Grid>
      {displayMessage && (
        <Grid item xs={12}>
            <Alert severity={messageType} sx={{ display: 'flex', marginTop: '1rem' }}>
              <AlertTitle>{messageType === "success" ? "Success!" : "Error!"}</AlertTitle>
            {displayMessage}
          </Alert>
        </Grid>
        )}
    </form>
    </FormProvider>
    {/* <DevTool control={control} />       */}
    </Container>
  )
}