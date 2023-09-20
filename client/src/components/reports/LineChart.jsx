// src/LineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import{Chart as ChartJS,
LineElement,
CategoryScale, // x xis
LinearScale,// y axis
PointElement} from 'chart.js';
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const LineChart = (props) => {
    const {data, title} = props;
    const options = {
        plugins: {
            legend: {
                display: true
            }
        }
    }

  return (
    <div className="line-chart border text-center">
      <div className="mt-2" style={{ fontWeight: "bold" }}>
        <p>
         {title}
        </p>
      </div>

      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
