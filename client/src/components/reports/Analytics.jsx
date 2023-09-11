import React, { useEffect } from 'react'
import  { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';
import Piechart from './Piechart';
import LineChart from './LineChart';


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
        const res = await axios.get("http://localhost:8800/auth/access");

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
          `http://localhost:8800/report/availability/${labs}`
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
          `http://localhost:8800/report/condition/${labs}`
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
          `http://localhost:8800/report/checkoutstatus/${labs}`
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


  return (
    <div className="container">
      <h2 className="text-center">Analytics</h2>
      <div className="mt-2">
        <Link to="/reports">Reports</Link>
      </div>
      <div className="row my-4">
        <div className="col-md-4 border">
          {availabilityLoaded && (
            <Piechart title="Availability of resources" data={dataA} />
          )}
        </div>
        <div className="col-md-4 border">
          {conditionLoaded && (
            <Piechart title="Condition of resources" data={dataC} />
          )}
        </div>
        <div className="col-md-4 border">
          {checkoutStatusLoaded && (
            <Piechart title="Check-out status" data={dataB} />
          )}
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-md-8'>
          <LineChart />
        </div>
      </div>
    </div>
  );
}

export default Analytics