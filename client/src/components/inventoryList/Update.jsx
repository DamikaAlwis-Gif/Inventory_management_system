import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import FormItem from "./FormItem";
import FormItemSelect from "./FormItemSelect";
import { validate, validateProperty } from "../Validation/AddValidation";
import {base_url} from '../../config';

const Update = () => {
  const { id } = useParams();
  const [labs, setLabs] = useState([]); // array of lab names
  const [errors, setErrors] = useState({});

  //console.log(labs);
  const [asset, setAsset] = useState({});
  useEffect(() => {
    const getLabs = async () => {
      try {
        const res = await axios.get(`${base_url}/auth/access`);
        
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
      const res = await axios.get(`${base_url}/resources/update/` + id);
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
    const errorslist = { ...errors };
    const error = validateProperty(e.target);
    if (error) errorslist[e.target.name] = error;
    else delete errorslist[e.target.name];
    setErrors(errorslist);
    setAsset((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    //console.log(asset);
  };
  const navigate = useNavigate();
  const handleSave = (e) => {
    e.preventDefault();
    const errors = validate(asset);
    setErrors(errors || {});
    if (errors) return;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleIsConfirmed();
        
      }
    });
  };
  const handleError = () => { 
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
    navigate("/adminmore/" + id);
  };


  const handleIsConfirmed = async () => {
    try {
      const responce = await axios.put(
        `${base_url}/resources/update/` + id,asset );

        if (responce.data.status === "ok") {
          Swal.fire("Updated!", "The asset has been updated.", "success");
           navigate("/adminmore/" + id);
        }
        else{
          handleError();
        }

     } catch (error) {
       handleError();
       }
  };
  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/adminmore/" + id);
  }  

  

  return (
    <div className="container-md">
      <div className="row my-5 ">
        <div
          className="col-6 mx-auto shadow "
          style={{
            backgroundColor: "white",
            borderRadius: "30px",
            padding: "1% 2%",
          }}
        >
          <h4 className="my-3">Update Asset Details</h4>

          <form>
            <div className="row">
              <FormItem
                onChange={handleChange}
                type={"text"}
                name={"name"}
                value={asset.name}
                title={"Name"}
                placeholder={""}
                error={errors.name}
              ></FormItem>

              <FormItem
                onChange={handleChange}
                type={"text"}
                name={"resource_type"}
                value={asset.resource_type}
                placeholder={"eg: Computer , Laptop , Printer"}
                title={"Resource Type"}
                error={errors.resource_type}
              ></FormItem>
            </div>

            <div className="row">
              <FormItem
                onChange={handleChange}
                type={"text"}
                name={"model"}
                value={asset.model}
                placeholder={""}
                title={"Model"}
                error={errors.model}
              ></FormItem>

              <FormItem
                onChange={handleChange}
                type={"text"}
                name={"serial_number"}
                value={asset.serial_number}
                placeholder={""}
                title={"Serial Number"}
                error={errors.serial_number}
              ></FormItem>
            </div>
            <FormItem
              onChange={handleChange}
              type={"text"}
              name={"specifications"}
              value={asset.specifications}
              placeholder={""}
              title={"Specifications"}
              error={errors.specifications}
            />

            <div className="row">
              <FormItemSelect
                onChange={handleChange}
                name={"lab_name"}
                value={asset.lab_name}
                title={"Lab Name"}
                list={labs}
                error={errors.lab_name}
              ></FormItemSelect>

              <FormItem
                onChange={handleChange}
                type={"text"}
                name={"location"}
                value={asset.location}
                placeholder={""}
                title={"Location"}
                error={errors.location}
              />
            </div>

            <div className="row">
              <FormItemSelect
                onChange={handleChange}
                name={"availability"}
                value={asset.availability}
                title={"Availability"}
                list={[
                  "Available",
                  "Checked out",
                  "Under maintenance",
                  "Out of order",
                ]}
                error={errors.availability}
              />

              <FormItemSelect
                onChange={handleChange}
                name={"resource_condition"}
                value={asset.resource_condition}
                title={"Condition"}
                list={["Excellent", "Good", "Fair", "Poor", "Out of order"]}
                error={errors.resource_condition}
              />
            </div>
            <div className="row">
              <FormItem
                onChange={handleChange}
                type={"date"}
                name={"last_maintenance_date"}
                value={asset.last_maintenance_date}
                placeholder={""}
                title={"Last Maintenance Date"}
                error={errors.last_maintenance_date}
              />

              <FormItem
                onChange={handleChange}
                type={"text"}
                name={"maintenance_interval"}
                value={asset.maintenance_interval}
                placeholder={""}
                title={"Maintenance Interval"}
                error={errors.maintenance_interval}
              />
            </div>

            <div className="row">
              <FormItemSelect
                onChange={handleChange}
                name={"is_portable"}
                value={asset.is_portable}
                title={"Is Portable"}
                list={["Yes", "No"]}
                error={errors.is_portable}
              />

              <FormItem
                onChange={handleChange}
                type={"text"}
                name={"img_url"}
                value={asset.img_url}
                placeholder={""}
                title={"Image Url"}
                error={errors.img_url}
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
