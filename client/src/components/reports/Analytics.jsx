import React, { useEffect } from 'react'
import  { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';
import Piechart from './Piechart';
import LineChart from './LineChart';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import {base_url} from '../../config';


const Analytics = () => {
  axios.defaults.withCredentials = true;
  const [accessLab, setAccessLab] = useState([]);
  const [labsLoaded, setLabsLoaded] = useState(false);
  const [availabilityData, setAvailabilityData] = useState([]);
  const [availabilityLoaded, setAvailabilityLoaded] = useState(false);
  const [conditionData, setConditionData] = useState([]);
  const [conditionLoaded, setConditionLoaded] = useState(false);
  const [checkoutStatusData, setCheckoutStatusData] = useState([]);
  const [checkoutStatusLoaded, setCheckoutStatusLoaded] = useState(false);
  const [numCheckouts, setNumCheckouts] = useState([]);
  const [numCheckoutsLoaded, setNumCheckoutsLoaded] = useState(false);
  const [numCheckins, setNumCheckins] = useState([]);
  const [numCheckinsLoaded, setNumCheckinsLoaded] = useState(false);
  const [numReservations, setNumReservations] = useState([]);
  const [numReservationsLoaded, setNumReservationsLoaded] = useState(false);
  const [numMaintenances, setNumMaintenances] = useState([]);
  const [numMaintenancesLoaded, setNumMaintenancesLoaded] = useState(false);
  const colors = [
    "#a7c5eb",
    "#b2d8b2",
    "#ff6b6b",
    "#fdfd96",
    "#f9d5e5",
    "#8B735B",
    "#d5b8e1",
  ];
  useEffect(() => {
    const getLabs = async () => {
      try {
        const res = await axios.get(`${base_url}/auth/access`);

        const list = res.data.map((item) => item.name);
        setAccessLab(list);
        setLabsLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    getLabs();
  }, []);

  useEffect(() => {
    const labs = accessLab.join(",");
    const getAvailabilityReport = async () => {
      try {
        const res = await axios.get(
          `${base_url}/report/availability/${labs}`
        );
        setAvailabilityData(res.data);
        setAvailabilityLoaded(true);
         
      } catch (error) {
        console.log(error);
      }
    };
    if (labsLoaded) {
      getAvailabilityReport();
    }
  }, [accessLab]);

  useEffect(() => {
    const labs = accessLab.join(",");
    const getConditionReport = async () => {
      try {
        const res = await axios.get(
          `${base_url}/report/condition/${labs}`
        );
        setConditionData(res.data);
        setConditionLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    if (labsLoaded) {
      getConditionReport();
    }
  }, [accessLab]);

  useEffect(() => {
    const labs = accessLab.join(",");
    const getCheckOutStatus = async () => {
      try {
        const res = await axios.get(
          `${base_url}/report/checkoutstatus/${labs}`
        );
        setCheckoutStatusData(res.data);
        setCheckoutStatusLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    if (labsLoaded) {
      getCheckOutStatus();
    }
  }, [accessLab]);

   useEffect(() => { //get number of checkouts in a week
    const labs = accessLab.join(",");
    const getNumCheckouts = async () => {
      try {
        const res = await axios.get(
          `${base_url}/report/numcheckouts/${labs}`
        );
        console.log(res.data);
        setNumCheckouts(res.data);
        setNumCheckoutsLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    if (labsLoaded) {
      getNumCheckouts();
    }
   },[accessLab]);

   useEffect(() => {
     //get number of checkins in a week
     const labs = accessLab.join(",");
     const getNumCheckins = async () => {
       try {
         const res = await axios.get(
           `${base_url}/report/numcheckins/${labs}`
         );
         console.log(res.data);
         setNumCheckins(res.data);
         setNumCheckinsLoaded(true);
       } catch (error) {
         console.log(error);
       }
     };
     if (labsLoaded) {
       getNumCheckins();
     }
   }, [accessLab]);
   useEffect(() => {
     //get number of reservations in upcoming week
     const labs = accessLab.join(",");
     const getNumReservations = async () => {
       try {
         const res = await axios.get(
           `${base_url}/report/numreservations/${labs}`
         );
         console.log(res.data);
         setNumReservations(res.data);
         setNumReservationsLoaded(true);
       } catch (error) {
         console.log(error);
       }
     };
     if (labsLoaded) {
       getNumReservations();
     }
   }, [accessLab]);

   useEffect(() => {
     //get number of maintenances in upcoming week
     const labs = accessLab.join(",");
     const getNumMaintenances = async () => {
       try {
         const res = await axios.get(
           `${base_url}/report/nummaintenances/${labs}`
         );
         setNumMaintenances(res.data);
         setNumMaintenancesLoaded(true);
       } catch (error) {
         console.log(error);
       }
     };
     if (labsLoaded) {
       getNumMaintenances();
      
     }
   }, [accessLab]);



  const dataA = {
    labels: availabilityData.map((item) => item.availability),
    datasets: [
      {
        label: "Availability of resources",
        data: availabilityData.map((item) => item.count),
        backgroundColor: colors.slice(0, availabilityData.length),
        // borderColor: ["red", "blue", "yellow"],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };
  const dataC = {
    labels: conditionData.map((item) => item.resource_condition),
    datasets: [
      {
        label: "Condition of resources",
        data: conditionData.map((item) => item.count),
        backgroundColor: colors.slice(0, conditionData.length),
        // borderColor: ["red", "blue", "yellow"],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };
  const dataB = {
    labels: checkoutStatusData.map((item) => item.status),
    datasets: [
      {
        label: "Check-out status",
        data: checkoutStatusData.map((item) => item.count),
        backgroundColor: colors.slice(0, conditionData.length),
        // borderColor: ["red", "blue", "yellow"],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };
  const labelsNumofCheckOuts = numCheckouts.map((item) => item.date);
  const dataNumofCheckouts = {
    labels: labelsNumofCheckOuts,
    datasets: [
      {
        axis: "y",
        label: "Check-outs",
        data: numCheckouts.map((item) => item.count),
        fill: false,
        borderColor: "red",
        borderWidth: 2,
        pointBackgroundColor: "red",
        backgroundColor: "red",
      },
     
      {
        axis: "y",
        label: "Check-ins",
        data: numCheckins.map((item) => item.count),
        fill: false,
        borderColor: "green",
        borderWidth: 2,
        pointBackgroundColor: "green",
        backgroundColor: "green",
      },
    ],
  };
  const labelsNumofReservations = numReservations.map((item) => item.date);
  const dataNumresrvations = {
    labels: labelsNumofReservations,
    datasets: [
      {
        axis: "y",
        label: "Reservations",
        data: numReservations.map((item) => item.count),
        fill: false,
        borderColor: "red",
        borderWidth: 2,
        pointBackgroundColor: "red",
        backgroundColor: "red",
      },

      {
        axis: "y",
        label: "Maintenances",
        data: numMaintenances.map((item) => item.count),
        fill: false,
        borderColor: "green",
        borderWidth: 2,
        pointBackgroundColor: "green",
        backgroundColor: "green",
      },
    ],
  };


  return (
    <div className="container">
      <Typography
        variant="h5"
        gutterBottom
        mb={3}
        mt={4}
        align="center"
        style={{color: '#252652', padding: "20px 0px 10px 0px"}}>
          <strong>Analytics</strong>
      </Typography>
      <div className="mt-2">
        <Link to="/reports">Reports</Link>
      </div>

      <Paper
          elevation={4}
          sx={{
            marginTop: 1,
            padding: '14px 0px 0px 0px',
            borderRadius: 4,
            backgroundColor: '#ffffff'
          }}>
      <div className="row my-4  p-3">
        <div className="col-md">
          {availabilityLoaded && (
            <Piechart title="Availability of resources" data={dataA} />
          )}
        </div>
        <div className="col-md mx-2">
          {conditionLoaded && (
            <Piechart title="Condition of resources" data={dataC} />
          )}
        </div>
        <div className="col-md">
          {checkoutStatusLoaded && (
            <Piechart title="Check-out status" data={dataB} />
          )}
        </div>
      </div>
      <div className="row my-3 ">
        <div className="col-md">
          {numCheckoutsLoaded && numCheckinsLoaded && (
            <LineChart
              data={dataNumofCheckouts}
              title={
                "Num of check-outs , check-ins happend in last 7 days"
              }
            />
          )}
        </div>

        <div className="col-md mx-2">
          {numReservationsLoaded && numMaintenancesLoaded && (
            <LineChart
              data={dataNumresrvations}
              title={
                "Number of reservations and maintenances coming in the next 7 days"
              }
            />
          )}
        </div>
      </div>
      </Paper>
    </div>
  );
}

export default Analytics
