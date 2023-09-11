// src/LineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import{Chart as ChartJS,
LineElement,
CategoryScale, // x xis
LinearScale,// y axis
PointElement} from 'chart.js';
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const LineChart = () => {
    const labels = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];
    const data = {
      labels: labels,
      datasets: [
        {
          axis: "y",
          label: "Check-outs",
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: "red",
          borderWidth: 2,
          pointBackgroundColor: "red",
          backgroundColor: "red",
        },
        {
          axis: "y",
          label: "Reservations",
          data: [56, 67, 34, 21, 76, 85, 30],
          fill: false,
          borderColor: "blue",
          borderWidth: 2,
          pointBackgroundColor: "blue",
          backgroundColor: "blue",
        },
        {
          axis: "y",
          label: "Check-ins",
          data: [12, 34, 56, 78, 90, 12, 34],
          fill: false,
          borderColor: "green",
          borderWidth: 2,
          pointBackgroundColor: "green",
          backgroundColor: "green",
        },
      ],
    };
    const options = {
        plugins: {
            legend: {
                display: true
            }
        }
    }

  return (
    <div className="line-chart border text-center">
      <Line data={data}  options={options}/>
      <div className='mt-2' style={{fontWeight: "bold"}}>
        <p>Num of check-outs , check-ins & reservations happend in last 7 days</p>
      </div>

    </div>
  );
};

export default LineChart;
