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
    const labels = ["January", "February", "March", "April", "May", "June", "July"];
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
    <div className="line-chart">
      <Line data={data}  />
    </div>
  );
};

export default LineChart;
