import React from "react";

const TableMtClashHandle=(props)=>{

    const { details,onClickMore } = props;
    // {unavailability.starting_time.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })
    //onClick={(e) => onClickMore(e, mt.reservation_id)}
    return (
      <div>
        <table className="table table-primary table-hover table-responsive  ">
          <thead className=" ">
            <tr>
          
              <th>Starting</th>
              <th>Ending</th>
              <th>Status</th>
              <th>Purpose</th>
    
              
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {details.map((mt) => (
              <tr  key={mt.reservation_id} 
              
              >
               
                <td>{mt.start_date}</td>
                <td>{mt.end_date}</td>
                <td>{mt.status === "Undone" ? "Incomplete" : "Complete"}</td> 
                <td>{mt.purpose}</td>
                
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );



};
export default TableMtClashHandle;