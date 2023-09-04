import React from "react";

const TableReservDates = (props) => {
  const { details,onClickMore } = props;
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
          {Object.entries(details).map((unavailability) => (
            <tr key={unavailability.id}>
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
