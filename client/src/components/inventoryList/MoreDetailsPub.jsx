import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import TableMore from "./TableMore";


const MoreDetailsPub = () => {
  const [details, setDetails] = useState({});
  const { id } = useParams();
  const [ok, setok] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchAllDetailsByID = async (id) => {
      try {
        const res = await axios.get("http://localhost:8800/resources/usermore/" + id);
        
        if (res.data && res.data.length > 0) {
          setDetails(res.data[0]);
          //console.log(res.data[0]);
          setLoaded(true);
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
    { loaded } && (
      <div>
        {ok ? (
          <div>
            <h1 className="text-center">More Details</h1>
            <div className="container ">
              <button
                type="button"
                className="btn btn btn-primary btn-sm"
                onClick={(e) => handleReserve(e, id)}
              >
                Reserve
              </button>
              <div className="row mt-3 border border-2 rounded shadow pt-3">
                <div className="col-md-3">
                  <img
                    src={
                      details.img_url
                        ? details.img_url
                        : "https://via.placeholder.com/150"
                    }
                    alt="Resource Image"
                    className="img-fluid mt-2 rounded border-4 mx-auto d-block"
                  />
                </div>
                <div className="col-md ">
                  <TableMore details={details} />
                </div>
              </div>
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
    )
  );
};

export default MoreDetailsPub;
