import React from "react";
import {Chart as ChartJS , ArcElement, Tooltip, Legend} from "chart.js";
import {Pie} from "react-chartjs-2";

const Piechart = (props) => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const {data, title} = props;

 
  const options = {
    responsive: true,
    
  }
  return (
    <div>
      <p className="text-center mt-1  " style={{ fontWeight: "bold" }}>
        {title}
      </p>
      <Pie data={data} options={options}></Pie>
    </div>
  );
}

export default Piechart