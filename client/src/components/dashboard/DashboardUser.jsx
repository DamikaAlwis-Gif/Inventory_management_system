import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { NAVBAR_HEIGHT } from '../../constants';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import DashboardInfoCard from './DashboardInfoCard';
import DenseTable from './TableDense';

import {base_url} from '../../config';

import "@fontsource/cinzel-decorative/400.css";
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material';

let themeDashboardHeading = createTheme({
  typography: {
    fontFamily: [
      "Cinzel Decorative",
    ].join(','),
},});
themeDashboardHeading = responsiveFontSizes(themeDashboardHeading);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Dashboard() {

  const [checkedOut, setCheckedOut] = useState(0);
  const [daysUntilCheckIn, setDaysUntilCheckIn] = useState(false);
  const [reserved, setReserved] = useState(0);
  const [daysUntilReservation, setDaysUntilReservation] = useState(0);
  const [upcomingData, setUpcomingData] = useState([]);

  useEffect(() => {

    // const getVerification = async () => {
    //   const response = await axios.get("http://localhost:8800/dashboard/verify");
    //   console.log(response);
    // }

    // getVerification();

    const getPersonalStatistics = async () => {
      try {
        const statistics = await axios.get(`${base_url}/dashboard/personal`)

        console.log(statistics.data);
        statistics.data.checkouts && setCheckedOut(statistics.data.checkouts);
        statistics.data.daysTillCheckin && setDaysUntilCheckIn(statistics.data.daysTillCheckin);
        statistics.data.reservations && setReserved(statistics.data.reservations);
        statistics.data.daysTillReservation && setDaysUntilReservation(statistics.data.daysTillReservation);

        // const upcoming = await axios.get(`${base_url}/dashboard/upcoming`)
        // console.log(upcoming.data);
        // setUpcomingData(upcoming.data);

      } catch (error) {
        console.log(error);
      }
    }

    getPersonalStatistics();

  }, [])

  useEffect(() => {
    if (daysUntilReservation === 9999) {
      setDaysUntilReservation(null);
    }
    if (daysUntilCheckIn === 9999) {
      setDaysUntilCheckIn(null);
    }
  }, [daysUntilReservation, daysUntilCheckIn])

  return (
    <Container
      maxWidth="lg"
      disableGutters={true}
      sx={{
        minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
        overflowY: 'auto',
        width: '1050px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',

        '@media (max-width:1325px)':{width: '80%',},
        '@media (max-width:1200px)':{width: '85%',},
        '@media (max-width:1100px)':{width: '90%',},
        '@media (max-width:1010px)':{width: '94%',},
        '@media (max-width:975px)': {width: '97%',},
        '@media (max-width:899px)': {width: '70%',},
        '@media (max-width:850px)': {width: '75%',},
        '@media (max-width:775px)': {width: '80%',},
        '@media (max-width:725px)': {width: '85%',},
        '@media (max-width:650px)': {width: '90%',},
        '@media (max-width:550px)': {width: '95%',},
        '@media (max-width:525px)': {width: '97%',},
        '@media (max-width:460px)': {width: '90%',},
        '@media (max-width:420px)': {width: '95%',},
      }}
    >

    <div>
      <ThemeProvider theme={themeDashboardHeading}>
        <Typography variant="h4" align='center' mb={1} sx={{color: '#201d30'}}>
          Welcome to
        </Typography>
        <Typography variant="h3" align='center' mb={6} sx={{color: '#201d30'}}>
          Wisdom Education Laboratories
        </Typography>
      </ ThemeProvider>
    </div>

      <ThemeProvider theme={darkTheme}>
      {/*Info Cards*/}
      <Grid container rowSpacing={{ xs: 1, sm: 2, md: 2, lg: 3}} columnSpacing={{ xs: 1, sm: 2, md: 1, lg: 3}} mb={2}>
        <Grid item container xs={12} sm={6} md={3} justifyContent='center'>
          <DashboardInfoCard customColor="primary" customLabel={
            <span>
              <Typography variant="h2" style={{ display: 'inline' }}>
                <strong>{checkedOut}</strong>
              </Typography>
              &nbsp;&nbsp;
              <Typography variant="subtitle1" style={{ display: 'inline' }}>
                items
              </Typography>

              <Typography variant="body1" sx={{ marginTop: '15px', '@media (max-width:600px)': {marginTop:'0px'} }}>
                currently checked-out
              </Typography>
            </span>}
          />
        </Grid>

        <Grid item container xs={12} sm={6} md={3} justifyContent='center'>
          <DashboardInfoCard customColor="secondary" customLabel={
            <span>
              <Typography variant="h2" style={{ display: 'inline' }}>
              <strong>{daysUntilCheckIn ? daysUntilCheckIn : "n/a"}</strong>
              </Typography>
              &nbsp;&nbsp;
              <Typography variant="subtitle1" style={{ display: 'inline' }}>
                days
              </Typography>

              <Typography variant="body1" sx={{ marginTop: '15px', '@media (max-width:600px)': {marginTop:'0px'} }}>
                until next check-in&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Typography>
            </span>}
          />
        </Grid>

        <Grid item container xs={12} sm={6} md={3} justifyContent='center'>
          <DashboardInfoCard customColor="primary" customLabel={
            <span>
              <Typography variant="h2" style={{ display: 'inline' }}>
              <strong>{reserved}</strong>
              </Typography>
              &nbsp;&nbsp;
              <Typography variant="subtitle1" style={{ display: 'inline' }}>
                items
              </Typography>

              <Typography variant="body1" sx={{ marginTop: '15px', '@media (max-width:600px)': {marginTop:'0px'} }}>
                currently reserved&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Typography>
            </span>}
          />
        </Grid>

        <Grid item container xs={12} sm={6} md={3} justifyContent='center'>
          <DashboardInfoCard customColor="secondary" customLabel={
            <span>
              <Typography variant="h2" style={{ display: 'inline' }}>
              <strong>{daysUntilReservation ? daysUntilReservation : "n/a"}</strong>
              </Typography>
              &nbsp;&nbsp;
              <Typography variant="subtitle1" style={{ display: 'inline' }}>
                days
              </Typography>

              <Typography variant="body1" sx={{ marginTop: '15px', '@media (max-width:600px)': {marginTop:'0px'}}}>
                until next reservation
              </Typography>
            </span>}
          />
        </Grid>
      </Grid>
      </ThemeProvider>
      {/* <DenseTable role="user" data={upcomingData}/> */}
    </Container>
  );
}
