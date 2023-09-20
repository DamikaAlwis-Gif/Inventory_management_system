import React from "react";

const TableReservDates = (props) => {
  const { details,onClickMore } = props;
  // {unavailability.starting_time.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })
  return (
    <div>
      <table className="table table-primary table-hover table-responsive  ">
        <thead className=" ">
          <tr>
            <th>Starting</th>
            <th>Ending</th>
            
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {details.map((unavailability) => (
            <tr >
              <td>{unavailability.starting_time}</td>
              <td>{unavailability.ending_time}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableReservDates;
