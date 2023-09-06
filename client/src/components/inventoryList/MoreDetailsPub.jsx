import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../Auth/NavBar";
import TableMore from "./TableMore";

const MoreDetailsPub = () => {
  const [details, setDetails] = useState({});
  const { id } = useParams();
  const [ok, setok] = useState(true);

  useEffect(() => {
    const fetchAllDetailsByID = async (id) => {
      try {
        const res = await axios.get("http://localhost:8800/resources/usermore/" + id);
        
        if (res.data && res.data.length > 0) {
          setDetails(res.data[0]);
          //console.log(res.data[0]);
        } else {
          setok(false);
        }
      } catch (error) {
        console.log(error);
        //console.log("HEllo error");
      }
    };
    fetchAllDetailsByID(id);
  }, []);

  const navigate = useNavigate();
  
  const handleReserve = async (e,id) => {
    try {
      e.preventDefault();
     // const res = await axios.delete("http://localhost:8800/resources/" + id);
      console.log("Redirected to reservation data page!");
      navigate(`/reserve/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {ok ? (
        <div>
          
          <h1 className="text-center">More Details</h1>
          <div className="container">
            <div className="row">
              <div className="col-md mx-auto">

              <button 
                type="button"
                className="btn btn btn-primary btn-sm "
                onClick={(e) => handleReserve(e,id)}>
                  Reserve
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
            The asset with resource id {id} does not exist!
          </p>
        </div>
      )}
    </div>
  );
};

export default MoreDetailsPub;
