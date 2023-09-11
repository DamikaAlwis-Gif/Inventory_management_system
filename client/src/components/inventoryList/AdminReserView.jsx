import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminReserView=()=>{
    return(
        <div>
            <h1>Reservations</h1>
        <table className="table table-primary table-hover table-responsive  ">
          <thead className=" ">
            <tr>
                
              <th>User</th>
              <th>Resource</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Purpose</th>
              <th>Type</th>
    
              
            </tr>
          </thead>
          <tbody className="table-group-divider">
            <tr>
                <td>001</td>
                <td>015</td>
                <td>2023-09-15 07:00:00</td>
                <td>2023-09-17 14:30:00</td>
                <td>For practicals</td>
                <td>borrowing</td>
            </tr>
            <tr>
                <td>u002</td>
                <td>020</td>
                <td>2023-09-14 08:00:00</td>
                <td>2023-09-15 09:30:00</td>
                <td>For practicals</td>
                <td>borrowing</td>
            </tr>
            <tr>
                <td>u003</td>
                <td>7</td>
                <td>2023-09-15 15:00:00</td>
                <td>2023-09-17 10:00:00</td>
                <td>For practicals</td>
                <td>borrowing</td>
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
 export default AdminReserView;