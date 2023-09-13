import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SelectLIst from "./SelectList";
import Table from "./Table";
import Pagination from "../common/Pagination";


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



  axios.defaults.withCredentials = true;

  const [options, setoptions] = useState({
    lab: "All",
    availability: "All",
    type: "All",
  });

  const handleChange = (e) => {
    setoptions((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await axios.get("http://localhost:8800/auth/aaa");
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
  //console.log(labs);
  // }, []);
  useEffect(() => {

    labsLoaded && fetchAllResources();
  }, [labs]);


  const fetchAllResources = async () => {
    try {
      const params = labs.join(",");
      const url = `http://localhost:8800/resources/${params}`;
      const res = await axios.get(url);
      
      setResources(res.data.data);
      setintialResources(res.data.data);
      setTypes(res.data.typeList)
      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setItemsCount(resources.length);
    
  }, [resources]);
  

  const navigate = useNavigate();

  const handleMore = (e, id) => {
    //console.log("more cliked");
    e.preventDefault();
    if (role === "Technical Officer") navigate(`/adminmore/${id}`);
    else navigate(`/usermore/${id}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const temp = intialResources.filter((resource) => {
      //console.log(options.lab, resource.lab_name);
      return (
        (options.lab == resource.lab_name || options.lab === "All") &&
        (options.availability === resource.availability ||
          options.availability === "All") &&
           (options.type === resource.resource_type || options.type === "All")
      );
    });
    setResources(temp);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    navigate("/add");
  };
  const [searchvalue, setSearchvalue] = useState("");


  const handleSearchByType = (e) => {
    const value = e.target.value;
    setSearchvalue(value);
    const temp = intialResources.filter(
      (item) =>
        value === "" ||
        item.resource_id.toString().includes(value) ||
        item.name.toLowerCase().includes(value)
    );
    setResources(temp);
  };
  const handlePageChange = (e,page) => {
    e.preventDefault();
    setCurrentPage(page); 
    
  };
  return (
    <div>
      <h1 className="text-center">Resources</h1>

      <div className="container">
        <SelectLIst
          onChange={handleChange}
          onSearch={handleSearch}
          options={options}
          labs={labs}
          types={types}
          searchvalue={searchvalue}
          handleSearchByType={handleSearchByType}
        ></SelectLIst>
        {role === "Technical Officer" && (
          <div className="my-2">
            <button
              className="btn btn-sm btn-success"
              onClick={(e) => handleAdd(e)}
            >
              Add asset
            </button>
          </div>
        )}
        <Table
          resources={resources}
          onClickMore={handleMore}
          currentPage={currentPage}
          pageSize={pageSize}
        ></Table>
        <Pagination
          onPageChange={handlePageChange}
          pageSize={pageSize}
          itemsCount={itemsCount}
          currentPage={currentPage}
        ></Pagination>
      </div>
    </div>
  );
};

export default Resources;
