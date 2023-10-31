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
  },
});
themeDashboardHeading = responsiveFontSizes(themeDashboardHeading);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Dashboard() {

  const [availableNow, setAvailableNow] = useState(0);
  const [checkedOut, setCheckedOut] = useState(0);
  const [underMaintenance, setUnderMaintenance] = useState(0);
  const [outofOrder, setOutofOrder] = useState(0);
  const [upcomingData, setUpcomingData] = useState([]);

  useEffect(() => {

    // const getVerification = async () => {
    //   const response = await axios.get("${base_url}/dashboard/verify");
    //   console.log(response);
    // }

    // getVerification();

    const getStatistics = async () => {
      try {
        const statistics = await axios.get(`${base_url}/dashboard`)
        console.log(statistics.data);
        statistics.data.available && setAvailableNow(statistics.data.available);
        statistics.data.checkedOut && setCheckedOut(statistics.data.checkedOut);
        statistics.data.maintenance && setUnderMaintenance(statistics.data.maintenance);
        statistics.data.outofOrder && setOutofOrder(statistics.data.outofOrder);

        const upcoming = await axios.get(`${base_url}/dashboard/upcoming`)
        console.log(upcoming.data);
        setUpcomingData(upcoming.data);
      
      } catch (error) {
        console.log(error);
      }
    }

    getStatistics();

  }, [])


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
        <Typography
          variant="h3"
          align='center'
          mb={3}
          sx={{color: '#252652'}}
        >
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
                <strong>{availableNow}</strong>
              </Typography>
              &nbsp;
              <Typography variant="subtitle1" style={{ display: 'inline' }}>
                items
              </Typography>

              <Typography variant="body1" sx={{ marginTop: '15px', '@media (max-width:600px)': {marginTop:'0px'} }}>
                available now
              </Typography>
            </span>}
          />
        </Grid>

        <Grid item container xs={12} sm={6} md={3} justifyContent='center'>
          <DashboardInfoCard customColor="secondary" customLabel={
            <span>
              <Typography variant="h2" style={{ display: 'inline' }}>
              <strong>{checkedOut}</strong>
              </Typography>
              &nbsp;
              <Typography variant="subtitle1" style={{ display: 'inline' }}>
                items
              </Typography>

              <Typography variant="body1" sx={{ marginTop: '15px', '@media (max-width:600px)': {marginTop:'0px'} }}>
                checked out
              </Typography>
            </span>}
          />
        </Grid>

        <Grid item container xs={12} sm={6} md={3} justifyContent='center'>
          <DashboardInfoCard customColor="primary" customLabel={
            <span>
              <Typography variant="h2" style={{ display: 'inline' }}>
              <strong>{underMaintenance}</strong>
              </Typography>
              &nbsp;
              <Typography variant="subtitle1" style={{ display: 'inline' }}>
                items
              </Typography>

              <Typography variant="body1" sx={{ marginTop: '15px', '@media (max-width:600px)': {marginTop:'0px'} }}>
                under maintenance
              </Typography>
            </span>}
          />
        </Grid>

        <Grid item container xs={12} sm={6} md={3} justifyContent='center'>
          <DashboardInfoCard customColor="secondary" customLabel={
            <span>
              <Typography variant="h2" style={{ display: 'inline' }}>
              <strong>{outofOrder}</strong>
              </Typography>
              &nbsp;
              <Typography variant="subtitle1" style={{ display: 'inline' }}>
                items
              </Typography>

              <Typography variant="body1" sx={{ marginTop: '15px', '@media (max-width:600px)': {marginTop:'0px'} }}>
                out of order
              </Typography>
            </span>}
          />
        </Grid>
      </Grid>
      </ThemeProvider>
      { /* <DenseTable role="tech" data={upcomingData}/> */}
    </Container>
  );
}
