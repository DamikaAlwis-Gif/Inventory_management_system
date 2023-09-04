import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import TableReservDates from "./TableReservDates";
import TableMore from "./TableMore";

const Reserve = () => {
    const { id } = useParams();
    //const [details, setDetails] = useState({});
    const [details, setDetails] = useState([]);
    const [ok, setok] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllDetailsByID = async (id) => {
          try {
            const res = await axios.get("http://localhost:8800/resources/reservation/" + id);
            // res.data checks not null or undefined
            // res.data.length checks length property of res.data is greater than 0.
            if (res.data && res.data.length > 0) {
              setDetails(res.data[0]);
              console.log(res.data[0]);
            } else {
              setok(false);
            }
          } catch (error) {
            console.log(error);
            console.log("HEllo error");
          }
        };
        fetchAllDetailsByID(id);
      }, []);
  
      const handleGoAhead = async (e,id) => {
        try {
          e.preventDefault();
           navigate(`/AddReservDate/${id}`);
        } catch (error) {
          console.log(error);
        }
      };


return(
    <div>
      {ok ? (
        <div>
          <h1 className="text-center"> Unavailability of the item</h1>
          <div className="container">
            <div className="row">
              <div className="col-md mx-auto">
                
                <button className="btn btn btn-warning btn-sm m-2" onClick={(e) => handleGoAhead(e,id)}> Go ahead!
                </button>

                <TableMore details={details} />
              </div>
            </div>
            ;
          </div>
        </div>
      ) : (
        <div className="container text-center p-5">
          <p className="display-6 ">
            The asset with resource id {id} is avialable all the time!
          </p>
        </div>
      )}
    </div>

);

//   return <div>Hehe, this is the reserve data input page<br/>
//                 item id is :  {id}<br/>
//                 <TableMore details={details} />
//         </div>;
};

export default Reserve;