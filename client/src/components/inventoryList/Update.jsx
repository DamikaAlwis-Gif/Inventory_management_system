import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import FormItem from "./FormItem";
import FormItemSelect from "./FormItemSelect";

const Update = () => {
  const { id } = useParams();
  const [labs, setLabs] = useState([]); // array of lab names

  //console.log(labs);
  const [asset, setAsset] = useState({});
  useEffect(() => {
    const getLabs = async () => {
      try {
        const res = await axios.get("http://localhost:8800/auth/access");
        
        const list = res.data.map((item) => 
          item.name
        );
        setLabs(list);
      } catch (error) {
        console.log(error);
      }
    };
    getLabs();
  }, []);

  

  useEffect(() => {
    getResourceInfo(id);
  }, []);

  const getResourceInfo = async (id) => {
    try {
      const res = await axios.get("http://localhost:8800/resources/update/" + id);
      //console.log(res.data);
      const data = res.data[0];
      setAsset({...data, last_maintenance_date: data.last_maintenance_date.split("T")[0]});
    }
    catch (error) {
      console.log(error);
    }
  };
  axios.defaults.withCredentials = true;
  
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
      const responce = await axios.put(
        "http://localhost:8800/resources/update/" + id,asset );
      navigate("/adminmore/" + id);
      console.log(responce.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/adminmore/" + id);
  }  

  

  return (
    <div className="container-md">
      <div className="row my-5 ">
        <div className="col-6 bg-primary-subtle mx-auto shadow rounded">
          <h1 className="my-3">Update Asset</h1>

          <form>
            <div className="row">
              <FormItem
                onChange={handleChange}
                type={"text"}
                name={"name"}
                value={asset.name}
                _id={"name"}
                title={"Name"}
              ></FormItem>

              <FormItem
                onChange={handleChange}
                type={"text"}
                name={"resource_type"}
                value={asset.resource_type}
                placeholder={"eg: Computer , Laptop , Printer"}
                title={"Resource Type"}
              ></FormItem>
            </div>

            <div className="row">
              <FormItem
                onChange={handleChange}
                type={"text"}
                name={"model"}
                value={asset.model}
                ///placeholder={""}
                title={"Model"}
              ></FormItem>

              <FormItem
                onChange={handleChange}
                type={"text"}
                name={"serial_number"}
                value={asset.serial_number}
                ///placeholder={""}
                title={"Serial Number"}
              ></FormItem>
            </div>
            <FormItem
              onChange={handleChange}
              type={"text"}
              name={"specifications"}
              value={asset.specifications}
              ///placeholder={""}
              title={"Specifications"}
            />

            <div className="row">
              <FormItemSelect
                onChange={handleChange}
                name={"lab_name"}
                value={asset.lab_name}
                title={"Lab Name"}
                list={labs}
              ></FormItemSelect>

              <FormItem
                onChange={handleChange}
                type={"text"}
                name={"location"}
                value={asset.location}
                ///placeholder={""}
                title={"Location"}
              />
            </div>

            <div className="row">
              <FormItemSelect
                onChange={handleChange}
                name={"availability"}
                value={asset.availability}
                title={"Availability"}
                list={["Available", "Not Available", "Under Maintenace"]}
              />

              <FormItemSelect
                onChange={handleChange}
                name={"condition"}
                value={asset.condition}
                title={"Condition"}
                list={["Good", "Needs repair", "Out of order"]}
              />
            </div>
            <div className="row">
              <FormItem
                onChange={handleChange}
                type={"date"}
                name={"last_maintenance_date"}
                value={asset.last_maintenance_date}
                ///placeholder={""}
                title={"Last Maintenance Date"}
              />

              <FormItem
                onChange={handleChange}
                type={"text"}
                name={"maintenance_interval"}
                value={asset.maintenance_interval}
                ///placeholder={""}
                title={"Maintenance Interval"}
              />
            </div>

            <div className="row">
              <FormItemSelect
                onChange={handleChange}
                name={"is_portable"}
                value={asset.is_portable}
                title={"Is Portable"}
                list={["Yes", "No"]}
              />

              <FormItem
                onChange={handleChange}
                type={"text"}
                name={"img_url"}
                value={asset.img_url}
                ///placeholder={""}
                title={"Image Url"}
              />
            </div>
          </form>

          <div className="my-3">
            <button
              type="button"
              className="btn btn btn-success  "
              onClick={(e) => handleSave(e)}
            >
              Update
            </button>
            <button
              type="button"
              className="btn btn btn-danger m-2"
              onClick={(e) => handleCancel(e)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
