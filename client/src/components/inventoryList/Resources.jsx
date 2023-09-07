import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SelectLIst from "./SelectList";
import Table from "./Table";



const Resources = () => {
  const [resources, setResources] = useState([]);
  const [intialResources, setintialResources] = useState([]);
  const [role, setRole] = useState("");
  const [labs, setLabs] = useState(["lab"]); // array of lab names
  const [labsLoaded, setLabsLoaded] = useState(false); // labs has loaded or not
  const [types, setTypes] = useState([]); // array of types


  axios.defaults.withCredentials = true;

  const [options, setoptions] = useState({
    lab: "",
    availability: "",
    type: "",
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
        <Table resources={resources} onClickMore={handleMore} searchvalue = {searchvalue}></Table>
      </div>
    </div>
  );
};

export default Resources;
