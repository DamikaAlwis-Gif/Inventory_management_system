import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import TableMaintenance from "./TableMaintenance";
import TableReservDates from "./TableReservDates";
import TableMore from "./TableMore";


const Maintenance = () => {

    const { id } = useParams();
    const [details, setDetails] = useState([]);
    const [ok, setok] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMaintenaceData = async (id) => {
          try {
            const res = await axios.get("http://localhost:8800/resources/maintenance/" + id);
            // res.data checks not null or undefined
            // res.data.length checks length property of res.data is greater than 0.
            if (res.data && res.data.length > 0) {
              setDetails(res.data);
             // console.log(res.data[0]);
            } else {
              setok(false);
            }
          } catch (error) {
            console.log(error);
            
          }
        };
        fetchMaintenaceData(id);
      }, []);
  
      const handleAddNew = async (e,id) => {
        try {
          e.preventDefault();
          // navigate(`/AddReservDate/${id}`);
        } catch (error) {
          console.log(error);
        }
      };

      //<TableReservDates details={details} ></TableReservDates>

return(
    <div>
    {ok ? (
      <div>
        <h2 className="text-center"> Currently scheduled maintenance of the selected item:</h2>
        <div className="container">
          <div className="row">
            <div className="col-md mx-auto">
              
              <button className="btn btn btn-success btn-sm m-2" onClick={(e) => handleAddNew(e,id)}> Add New Maintenance
              </button>
             
              <TableMaintenance details={details} ></TableMaintenance>
             
            </div>
          </div>
          ;
        </div>
      </div>
    ) : (
      <div className="container text-center p-5">
        <p className="display-6 ">
          No scheduled maintenances yet for the item with Resorce_id {id}!
        </p>
        <button className="btn btn btn-success btn-sm m-2" onClick={(e) => handleAddNew(e,id)}> Add New Maintenance
              </button>
      </div>
    )}
  </div>
);
};
export default Maintenance;