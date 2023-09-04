
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Add = () => {

  const [labs, setLabs] = useState([]); // array of lab names
  useEffect(() => {
    const getLabs = async () => {
      try {
        const res = await axios.get("http://localhost:8800/auth/access");
        let list = [];
        res.data.map((item) => {
          list.push(item.name);
        });
       setLabs(list);
      } catch (error) {
         console.log(error);
      }
    };
    getLabs();
  }, []);

  const portability = ["Yes", "No"];
  axios.defaults.withCredentials = true;
  const [asset, setAsset] = useState({
    name: "",
    resource_type: "",
    model: "",
    serial_number: "",
    specifications: "",
    lab_name: "Select a lab",
    location: "",
    availability: "Select availability",
    resource_condition: "Select condition",
    is_portable: "Select",
    img_url: "",
    last_maintenance_date: "",
    maintenance_interval: "",
  });
  const handleChange = (e) => {
    setAsset((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(asset);
  };
  const navigate = useNavigate();
  const handleSave = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleIsConfirmed();
        Swal.fire("Saved!", "New asset has been saved.", "success");
      }
    });
  };

  const handleIsConfirmed = async () => {
    try {
      const responce = await axios.post(
        "http://localhost:8800/resources",
        asset
      );
      navigate("/resources");
      console.log(responce.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    setAsset({
      name: "",
      resource_type: "",
      model: "",
      serial_number: "",
      specifications: "",
      lab_name: "Select a lab",
      location: "",
      availability: "Select availability",
      resource_condition: "Select condition",
      is_portable: "",
      img_url: "",
      last_maintenance_date: "",
      maintenance_interval: "",
    });
  };

  return (
    <div className="container-md">
      <div className="row my-5 ">
        <div className="col-6 bg-primary-subtle mx-auto shadow rounded">
          <h1 className="my-3">Add a Asset</h1>

          <form>
            <div className="row">
              <div className="form-group col">
                <label htmlFor="name" className="form-label ">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={asset.name}
                  onChange={(e) => handleChange(e)}
                  name="name"
                  //placeholder="title"
                />
              </div>
              <div className="form-group col">
                <label htmlFor="type" className="form-label ">
                  Resource Type
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="type"
                  value={asset.resource_type}
                  onChange={(e) => handleChange(e)}
                  name="resource_type"
                  placeholder="eg: Computer , Laptop , Printer"
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col">
                <label htmlFor="" className="form-label ">
                  Model
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => handleChange(e)}
                  value={asset.model}
                  id=""
                  name="model"
                />
              </div>
              <div className="form-group col">
                <label htmlFor="" className="form-label ">
                  Serial Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id=""
                  onChange={(e) => handleChange(e)}
                  value={asset.serial_number}
                  name="serial_number"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="" className="form-label ">
                Specifications
              </label>
              <input
                type="text"
                className="form-control"
                id=""
                onChange={(e) => handleChange(e)}
                value={asset.specifications}
                name="specifications"
              />
            </div>
            <div className="row">
              <div className="form-group col">
                <label htmlFor="" className="form-label ">
                  Lab Name
                </label>
                <select
                  className="form-select"
                  name="lab_name"
                  value={asset.lab_name}
                  onChange={(e) => handleChange(e)}
                >
                  <option disabled>Select a lab</option>
                  {labs.map((lab) => (
                    <option key={lab} value={lab}>
                      {lab}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group col">
                <label htmlFor="" className="form-label ">
                  Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  id=""
                  onChange={(e) => handleChange(e)}
                  value={asset.location}
                  name="location"
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col">
                <label htmlFor="" className="form-label ">
                  Availability
                </label>
                <select
                  onChange={(e) => handleChange(e)}
                  class="form-select"
                  name="availability"
                  value={asset.availability}
                >
                  <option selected disabled>
                    Select availability
                  </option>
                  <option value="Available">Available</option>
                  <option value="Not Available">Not Available</option>
                  <option value="Under Maintenace">Under Maintenace</option>
                </select>
              </div>
              <div className="form-group col">
                <label htmlFor="" className="form-label ">
                  Condition
                </label>
                <select
                  className="form-select"
                  name="Condition"
                  value={asset.condition}
                  onChange={(e) => handleChange(e)}
                >
                  <option selected disabled>
                    Select condition
                  </option>
                  <option value="Good">Good</option>
                  <option value="Needs repair">Needs repair</option>
                  <option value="Under maintenance">Under maintenance</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="form-group col">
                <label htmlFor="" className="form-label ">
                  Last Maintenance Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id=""
                  onChange={(e) => handleChange(e)}
                  value={asset.last_maintenance_date}
                  name="last_maintenance_date"
                />
              </div>

              <div className="form-group col">
                <label htmlFor="" className="form-label ">
                  Maintenance Interval
                </label>
                <input
                  type="text"
                  className="form-control"
                  id=""
                  value={asset.maintenance_interval}
                  onChange={(e) => handleChange(e)}
                  name="maintenance_interval"
                />
              </div>
            </div>

            <div className="row">
              <div className="form-group col">
                <label htmlFor="" className="form-label ">
                  Is Portable
                </label>
                <select
                  className="form-select"
                  name="is_portable"
                  value={asset.is_portable}
                  onChange={(e) => handleChange(e)}
                >
                  <option disabled>Select</option>
                  {portability.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group col">
                <label htmlFor="" className="form-label ">
                  Img Url
                </label>
                <input
                  type="text"
                  className="form-control"
                  id=""
                  onChange={(e) => handleChange(e)}
                  value={asset.img_url}
                  name="img_url"
                />
              </div>
            </div>
          </form>
          <div className="my-3">
            <button
              type="button"
              className="btn btn btn-success  "
              onClick={(e) => handleSave(e)}
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn btn-danger m-2"
              onClick={(e) => handleClear(e)}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
