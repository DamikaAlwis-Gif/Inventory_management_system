import React from "react"; 
import Button from '@mui/material/Button';
import SearchIcon from "@mui/icons-material/Search";

const SelectList = (props) => {
  const {options , labs ,onChange, onSearch , types , searchvalue, handleSearchByType } = props;
  const availability = [
    "Available",
    "Checked out",
    "Under maintenance",
    "Out of order",
  ];
  return (
    <div>
      <form>
        <div className="row">
          <div className="col-md">
            <div className="form-floating mb-3">
              <input
                id="searchvalue"
                type="text"
                className="form-control"
                value={searchvalue}
                onChange={(e) => handleSearchByType(e)}
                placeholder="Type something to search"
              />
              <label htmlFor="searchvalue">Type something to search</label>
            </div>
          </div>

          <div className="col">
            <div className="form-floating mb-3">
              <select
                id="lab"
                className="form-select"
                value={options.lab}
                name="lab"
                onChange={(e) => onChange(e)}
              >
                <option value="All">All</option>
                {labs.map((lab) => (
                  <option key={lab} value={lab}>
                    {lab}
                  </option>
                ))}
              </select>
              <label htmlFor="lab">Lab</label>
            </div>
          </div>
          <div className="col">
            <div className="form-floating mb-3">
              <select
                id="type"
                className="form-select"
                value={options.type}
                name="type"
                onChange={(e) => onChange(e)}
              >
                <option value="All">All</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <label htmlFor="type">Type</label>
            </div>
          </div>
          <div className="col">
            <div className="form-floating mb-3">
              <select
                id="availability"
                className="form-select"
                value={options.availability}
                name="availability"
                onChange={(e) => onChange(e)}
              >
                <option value="All">All</option>
                {availability.map((avail) => (
                  <option key={avail} value={avail}>
                    {avail}
                  </option>
                ))}
              </select>
              <label htmlFor="availability">Availability</label>
            </div>
          </div>

          <div className="col">
            <Button
              variant="contained"
              size="small"
              onClick={(e) => onSearch(e)}
              disabled={
                options.lab === "" ||
                options.availability === "" ||
                options.type === ""
              }
              startIcon={<SearchIcon />}
              sx={{borderRadius: '8px'}}
              
            >
              Search
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SelectList;
