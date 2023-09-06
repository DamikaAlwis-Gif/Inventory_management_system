import React from "react";

const TableMaintenance = (props) => {
  const { details,onClickMore } = props;
  return (
    <div>
      <table className="table table-primary table-hover table-responsive  ">
        <thead className=" ">
          <tr>
            <th>Type</th>
            <th>Starting</th>
            <th>Ending</th>
            <th>Status</th>
            
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {details.map((mt) => (
            <tr >
              <td>{mt.maintenance_type}</td>
              <td>{mt.start_date}</td>
              <td>{mt.completion_date}</td>
              <td>{mt.status}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableMaintenance;
