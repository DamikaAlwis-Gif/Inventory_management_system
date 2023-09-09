import * as React from 'react';
import { NAVBAR_HEIGHT } from '../../constants';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import CustomDateTimePicker from './CustomDateTimePicker';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useForm, FormProvider } from 'react-hook-form';
// import { DevTool } from '@hookform/devtools';


export default function CheckIn() {

  const methods = useForm();
  const { register, formState, control } = methods;
  const { errors } = formState;

  const [checkinDatetime, setCheckinDatetime] = useState(dayjs(new Date()));

  const formattedDatetime = checkinDatetime.format('YYYY-MM-DD HH:mm:00');

  const onSubmit = (data) => {
    console.log('Proceed btn clicked');
    console.log(data.userId, data.resourceId, formattedDatetime);
  };

  return (
<Container
      maxWidth="md"
      sx={{
        height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
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
        '@media (max-width:450px)': {width: '90%',},
      }}
    >
    <FormProvider {...methods}>
    <form noValidate onSubmit={methods.handleSubmit(onSubmit)}>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2}}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom style={{color: '#444444'}}>
            Check-in
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField id="userId" label="User ID" variant="outlined" fullWidth type="text" {...register('userId', {required: "User ID is required"})}
          error={!!errors.userId}
          helperText={errors.userId?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField id="resourceId" label="Resource ID" variant="outlined" fullWidth type="text" {...register('resourceId', {required: "Resource ID is required"})}
          error={!!errors.resourceId}
          helperText={errors.resourceId?.message}
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

        {/* Buttons */}
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
          <Link to="/dashboard">
          <Button type="button" variant="contained" color="error" sx={{
            borderRadius: '20px',
            height: '40px',
            textTransform: 'capitalize',            
          }}>Cancel</Button></Link>
          <Button type="submit" variant="contained" color="primary" sx={{
            borderRadius: '20px',
            height: '40px',
            textTransform: 'capitalize'
          }}>Proceed</Button>
        </Grid>
      </Grid>
    </form>
    </FormProvider>
    {/* <DevTool control={control} /> */}
    </Container>
  )
}