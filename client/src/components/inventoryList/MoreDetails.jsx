import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import TableMore from "./TableMore";

const MoreDetails = () => {
  const [details, setDetails] = useState({});
  const { id } = useParams();
  const [ok, setok] = useState(true);

  
  useEffect(() => {
    const fetchAllDetailsByID = async (id) => {
      try {
        const res = await axios.get("http://localhost:8800/resources/adminmore/" + id);
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

  const navigate = useNavigate();
  const handleDelete = (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleIsConfirmed(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleIsConfirmed = async (id) => {
    try {
      const res = await axios.delete("http://localhost:8800/resources/" + id);
      console.log("Resourse is deleted!");
      navigate("/resources");
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    navigate("/update/" + id);
  };

  return (
    <div>
      {ok ? (
        <div>
          <h1 className="text-center">More Details</h1>
          <div className="container">
            <div className="row">
              <div className="col-md mx-auto">
                <button type="button" className="btn btn-primary btn-sm " onClick={(e) => handleUpdate(e)}>
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm m-2"
                  onClick={(e) => handleDelete(e, id)}
                >
                  Delete
                </button>
                <button className="btn btn btn-primary btn-sm ">Reserve</button>
                <button className="btn btn btn-warning btn-sm m-2">
                  
                  Shedule Maintenance
                </button>
                {/* <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <img
                        src={"https://picsum.photos/500/300"}
                        alt="Your Image"
                        className="img-fluid"
                      />
                    </div>
                  </div>
                </div> */}

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

export default MoreDetails;
