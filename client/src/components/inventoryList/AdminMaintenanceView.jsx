import React from "react";

const AdminMaintenanceView=()=>{
    return(
        <div>
            <h1>Due Maintenance</h1>
        <table className="table table-primary table-hover table-responsive  ">
          <thead className=" ">
            <tr>
                
              <th>Resource</th>
              <th>Maintenance Type</th>
              <th>Start Date</th>
              <th>End Date</th>
                  
              
            </tr>
          </thead>
          <tbody className="table-group-divider">
            <tr>
               
                <td>08</td>
                <td>simple</td>
                <td>2023-09-15 07:00:00</td>
                <td>2023-09-17 14:30:00</td>
                
                
            </tr>
            <tr>
                <td>10</td>
                <td>simple</td>
                <td>2023-09-14 08:00:00</td>
                <td>2023-09-15 09:30:00</td>
                
            </tr>
            <tr>
                <td>3</td>
                <td>simple</td>
                <td>2023-09-15 15:00:00</td>
                <td>2023-09-17 10:00:00</td>
            </tr>
            {/*
            {details.map((mt) => (
              <tr  key={mt.reservation_id} 
              
              >
               
                <td>{mt.start_date}</td>
                <td>{mt.end_date}</td>
                <td>{mt.status}</td>
                <td>{mt.purpose}</td>
                
                
              </tr>
            ))}         */}
          </tbody>
        </table>
      </div>
    );
};
 export default AdminMaintenanceView;