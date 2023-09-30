
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import FormItem from "./FormItem";
import FormItemSelect from "./FormItemSelect";
import { validate, validateProperty } from "../Validation/AddValidation";

const Add = () => {

  const [labs, setLabs] = useState([]); // array of lab names
  useEffect(() => {
    const getLabs = async () => {
      try {
        const res = await axios.get("http://localhost:8800/auth/access");
        const list = res.data.map((item) =>  item.name);
       setLabs(list);
      } catch (error) {
         console.log(error);
      }
    };
    getLabs();
  }, []);

  
  axios.defaults.withCredentials = true;
  const [asset, setAsset] = useState({
    name: "",
    resource_type: "",
    model: "",
    serial_number: "",
    specifications: "",
    lab_name: "",
    location: "",
    availability: "",
    resource_condition: "",
    is_portable: "",
    img_url: "",
    last_maintenance_date: "",
    maintenance_interval: "",
  });
  //console.log(asset);
  const [errors, setErrors] = useState({});
  //console.log(errors);



  const handleChange = (e) => {
    const errorslist = { ...errors };
    const error = validateProperty(e.target);
    if (error) errorslist[e.target.name] = error;
    else delete errorslist[e.target.name];
    setErrors(errorslist);
    setAsset((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    
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
      confirmButtonText: "Yes, save it!",
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
    navigate("/resources");
  };



  const handleIsConfirmed = async () => {
    try {
      const response = await axios.post("http://localhost:8800/resources",asset);
      console.log(response.data);
      if(response.data.status === "ok"){
        Swal.fire("Saved!", "New asset has been saved.", "success");
        navigate("/resources");
      }
      else{// database error
        handleError();
       }
    } 
    catch (error) {//axios error
      handleError();
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
      lab_name: "",
      location: "",
      availability: "",
      resource_condition: "",
      is_portable: "",
      img_url: "",
      last_maintenance_date: "",
      maintenance_interval: "",
    });
  };

  return (
    <div className="container-md">
      <div className="row my-5 ">
        <div className="col-6  mx-auto shadow " style={{
          backgroundColor: "white",
          borderRadius: "30px",
        }}>
          <h1 className="my-3">Add a Asset</h1>

          <form
            className=" g-3"
            onSubmit={(e) => handleSave(e)}
          >
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
                list={["Available", "Checked out", "Under maintenace", "Out of order"]}
                error={errors.availability}
              />

              <FormItemSelect
                onChange={handleChange}
                name={"resource_condition"}
                value={asset.resource_condition}
                title={"Condition"}
                list={["Excellent","Good","Fair", "Poor", "Out of order"]}
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
            <div className="my-3">
              <button
                type="submit"
                className="btn btn btn-success  "
                //onClick={(e) => handleSave(e)}
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;
