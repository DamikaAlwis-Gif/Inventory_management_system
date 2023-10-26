import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SelectLIst from "./SelectList";
import TableResources from "./Table";
import {base_url} from '../../config';

import Typography from '@mui/material/Typography';

const Resources = () => {
  const [resources, setResources] = useState([]);// resources to be displayed
  const [intialResources, setintialResources] = useState([]);// initial resources
  const [role, setRole] = useState("");// role of the user
  const [labs, setLabs] = useState(["lab"]); // array of lab names
  const [labsLoaded, setLabsLoaded] = useState(false); // labs has loaded or not
  const [types, setTypes] = useState([]); // array of types
  const [itemsCount, setItemsCount] = useState(0); // total number of items
  const [pageSize, setPageSize] = useState(10); // number of items per page
  const [currentPage, setCurrentPage] = useState(1); // current page number
  const [searchvalue, setSearchvalue] = useState("");



  axios.defaults.withCredentials = true;

  const [options, setoptions] = useState({
    lab: "All",
    availability: "All",
    type: "All",
  });// options for filtering

  const handleChange = (e) => {
    e.preventDefault();
    setoptions((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };// handle change in options
  
  useEffect(() => {

    const getUserInfo = async () => {// get user info
      try {
        const res = await axios.get(`${base_url}/auth/aaa`);
        setRole(res.data.role);
        setLabs(res.data.list);
        setLabsLoaded(true);
        //console.log(role, );
      } catch (error) {
        console.log(error);
      }
    };
    getUserInfo();
  }, []);
  
  useEffect(() => {

    labsLoaded && fetchAllResources();// if list of labs that user has acess 
    // has loaded then fetch all resources
  }, [labs]);


  const fetchAllResources = async () => {
    try {
      const params = labs.join(",");

      const url = `${base_url}/resources/${params}`;

      const res = await axios.get(url);
      
      setResources(res.data.data);
      setintialResources(res.data.data);
      setTypes(res.data.typeList)
      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setItemsCount(resources.length);// set total number of items
    
  }, [resources]);
  

  const navigate = useNavigate();

  const handleMore = (e, id) => { // handle more button click
    //console.log("more cliked");
    e.preventDefault();
    if (role === "Technical Officer" || role === "Admin" )// if role is admin or technical officer
      navigate(`/adminmore/${id}`);// navigate to adminmore
    else navigate(`/usermore/${id}`);// else navigate to usermore
  };

  const handleSearch = (e) => {// handle search button click
    e.preventDefault();

    const temp = intialResources.filter((resource) => {
      //console.log(options.lab, resource.lab_name);
      return (
        (options.lab == resource.lab_name || options.lab === "All") &&
        (options.availability === resource.availability ||
          options.availability === "All") &&
           (options.type === resource.resource_type || options.type === "All")// filter resources based on options
      );
    });
    setResources(temp);
  };

  const handleAdd = (e) => {// handle add button click
    e.preventDefault();
    navigate("/add");// navigate to add
  };
  

  const handleSearchByType = (e) => {// handle search by type
    const value = e.target.value;
    setSearchvalue(value);
    const temp = intialResources.filter(
      (item) =>
        value === "" ||
        item.resource_id.toString().includes(value) ||// filter resources based on search value
        item.name.toLowerCase().includes(value)
    );
    setResources(temp);
  };
  
 
  return (
    <div>
      <div className="container">
      <Typography
            variant="h4"
            gutterBottom
            mb={4} 
            align="center"
            style={{color: '#ffffff', padding: "20px 0px 10px 0px"}}>
              Resources
      </Typography>
      {/* serching part component */}
        <SelectLIst
          onChange={handleChange}
          onSearch={handleSearch}
          options={options}
          labs={labs}
          types={types}
          searchvalue={searchvalue}
          handleSearchByType={handleSearchByType}
          handleAdd={handleAdd}
          role={role}
        ></SelectLIst>
        
        {/* table component */}
        <TableResources
          resources={resources}
          onClickMore={handleMore}
          currentPage={currentPage}
          pageSize={pageSize}
        ></TableResources>
      </div>
    </div>
  );
};

export default Resources;
