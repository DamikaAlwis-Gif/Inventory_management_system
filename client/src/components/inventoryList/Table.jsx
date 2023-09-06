import React from "react";

const Table = (props) => {
  const { resources, onClickMore } = props;
  return (
    <div>
      <table className="table table-primary table-hover table-responsive  ">
        <thead className=" ">
          <tr>
            <th>Resource ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Lab</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {resources.map((resource) => (
            <tr
              key={resource.resource_id}
              onClick={(e) => onClickMore(e, resource.resource_id)}
            >
              <td>{resource.resource_id}</td>
              <td>{resource.name}</td>
              <td>{resource.resource_type}</td>
              <td>{resource.lab_name}</td>
              <td>{resource.availability}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;