import React from "react";
import { paginate } from "../utils/paginate";

const Table = (props) => {
  const { resources : allResources , onClickMore,currentPage, pageSize  } = props;
  //  console.log(searchvalue);
  //  console.log(typeof(searchvalue));
console.log(allResources);
  if (allResources.length === 0) {
    return (
      <div className="container text-center p-5">
        <p className="display-6 ">No resources found!</p>
      </div>
    );
  }
  
  const resources = paginate(allResources,currentPage, pageSize );
  console.log(resources);
  
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
