import * as React from 'react';
import { NAVBAR_HEIGHT } from '../../constants';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// import DashboardShortcut from './DashboardShortcut';
import DashboardInfoCard from './DashboardInfoCard';
import DenseTable from './TableDense';

import "@fontsource/cinzel-decorative/400.css";
import "@fontsource/noto-sans/400.css"; 

import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material';

let themeDashboardHeading = createTheme({
  typography: {
    fontFamily: [
      "Cinzel Decorative",
    ].join(','),
},});
themeDashboardHeading = responsiveFontSizes(themeDashboardHeading);

let themeBody = createTheme({
  typography: {
    fontFamily: ['Noto Sans',].join(','),
  },
});

export default function Dashboard() {

  return (
    <Container
      maxWidth="lg"
      disableGutters={true}
      sx={{
        minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
        overflowY: 'auto',
        width: '975px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        // paddingBottom: `${NAVBAR_HEIGHT}px`,

        '@media (max-width:1400px)':{width: '70%',},
        '@media (max-width:1325px)':{width: '75%',},
        '@media (max-width:1265px)':{width: '80%',},
        '@media (max-width:1200px)':{width: '75%',},
        '@media (max-width:1150px)':{width: '80%',},
        '@media (max-width:1100px)':{width: '85%',},
        '@media (max-width:1050px)':{width: '90%',},
        '@media (max-width:1010px)':{width: '94%',},
        '@media (max-width:975px)': {width: '97%',},
        '@media (max-width:899px)': {width: '60%',},
        '@media (max-width:850px)': {width: '65%',},
        '@media (max-width:775px)': {width: '70%',},
        '@media (max-width:725px)': {width: '75%',},
        '@media (max-width:675px)': {width: '80%',},
        '@media (max-width:600px)': {width: '85%',},
        '@media (max-width:550px)': {width: '85%',},
        '@media (max-width:525px)': {width: '90%',},
        '@media (max-width:460px)': {width: '90%',},
        '@media (max-width:420px)': {width: '95%',},
      }}
    >

    <div>
      <ThemeProvider theme={themeDashboardHeading}>
        <Typography variant="h4" align='center' mb={1}>
          Welcome to
        </Typography>
        <Typography variant="h3" align='center' mb={6}>
          Wisdom Education Laboratories
        </Typography>
      </ ThemeProvider>
    </div>

    <ThemeProvider theme={themeBody}>
      {/*Shortcuts*/}
      {/* <Grid container rowSpacing={{ xs: 1, sm: 2, md: 2, lg: 3}} columnSpacing={{ xs: 1, sm: 2, md: 1, lg: 3}} mb={2} sx={{ paddingTop: 3}}>

        <Grid item container xs={12} sm={6} md={3} justifyContent='center'>
          <DashboardShortcut 
            customColor="default"
            customLabel={
              <span>
                <Typography variant="body1" style={{ display: 'inline' }}>View&nbsp;</Typography>
                <Typography variant="h6" style={{ display: 'inline' }}><strong>Resources</strong></Typography>
              </span>}
            customLink="/resources"
          />
        </Grid>
        <Grid item container xs={12} sm={6} md={3} justifyContent='center'>
          <DashboardShortcut 
            customColor="default"
            customLabel={
              <span>
                <Typography variant="body1" style={{ display: 'inline' }}>Make a&nbsp;</Typography>
                <Typography variant="h6" style={{ display: 'inline' }}><strong>Reservation</strong></Typography>
              </span>}
          />
        </Grid>
        <Grid item container xs={12} sm={6} md={3} justifyContent='center'>
          <DashboardShortcut 
            customColor="default"
            customLabel={
              <span>
                <Typography variant="body1" style={{ display: 'inline' }}>My&nbsp;</Typography>
                <Typography variant="h6" style={{ display: 'inline' }}><strong>Reservations</strong></Typography>
              </span>}
            customLink="/privateReservations"
          />
        </Grid>
        <Grid item container xs={12} sm={6} md={3} justifyContent='center'>
          <DashboardShortcut 
            customColor="default"
            customLabel={
              <span>
                <Typography variant="body1" style={{ display: 'inline' }}>My&nbsp;</Typography>
                <Typography variant="h6" style={{ display: 'inline' }}><strong>Check-outs</strong></Typography>
              </span>}
          />
        </Grid>
      </Grid> */}

      {/*Info Cards*/}
      <Grid container rowSpacing={{ xs: 1, sm: 2, md: 2, lg: 3}} columnSpacing={{ xs: 1, sm: 2, md: 1, lg: 3}} mb={2}>
        <Grid item container xs={12} sm={6} md={3} justifyContent='center'>
          <DashboardInfoCard customColor="primary" customLabel={
            <span>
              <Typography variant="h2" style={{ display: 'inline' }}>
                <strong>03</strong>
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
              <strong>06</strong>
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
              <strong>02</strong>
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
              <strong>04</strong>
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

        {/* <Grid item container xs={6} sm={6} md={3} justifyContent='center'>
          <DashboardInfoCard customColor="primary" customLabel={
            <span>
              <Typography variant="h3" style={{ display: 'inline' }}>
                16
              </Typography>
              &nbsp;
              <Typography variant="subtitle1" style={{ display: 'inline' }}>
                items
              </Typography>
              <Typography variant="body1" sx={{ marginTop: '15px' }}>
                checked-out
              </Typography>
            </span>}
          />
        </Grid>

        <Grid item container xs={6} sm={6} md={3} justifyContent='center'>
          <DashboardInfoCard customColor="error" customLabel={
            <span>
              <Typography variant="h3" style={{ display: 'inline' }}>
                03
              </Typography>
              &nbsp;
              <Typography variant="subtitle1" style={{ display: 'inline' }}>
                items
              </Typography>
              <Typography variant="body1" sx={{ marginTop: '15px' }}>
                overdue
              </Typography>
            </span>}
          />
        </Grid>

        <Grid item container xs={6} sm={6} md={3} justifyContent='center'>
          <DashboardInfoCard customColor="warning" customLabel={
            <span>
              <Typography variant="h3" style={{ display: 'inline' }}>
              17
              </Typography>
              &nbsp;
              <Typography variant="subtitle1" style={{ display: 'inline' }}>
                items
              </Typography>
              <Typography variant="body1" sx={{ marginTop: '15px' }}>
                for maintenance
              </Typography>
            </span>}
          />
        </Grid>

        <Grid item container xs={6} sm={6} md={3} justifyContent='center'>
          <DashboardInfoCard customColor="secondary" customLabel={
            <span>
              <Typography variant="h3" style={{ display: 'inline' }}>
                00
              </Typography>
              &nbsp;
              <Typography variant="subtitle1" style={{ display: 'inline' }}>
                items
              </Typography>

              <Typography variant="body1" sx={{ marginTop: '15px' }}>
                maintenance today
              </Typography>
            </span>}
          />
        </Grid> */}
      </Grid>
      <DenseTable />
      </ ThemeProvider>
    </Container>
  );
}