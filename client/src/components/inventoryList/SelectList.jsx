import React from "react"; 
import Button from '@mui/material/Button';
import SearchIcon from "@mui/icons-material/Search";
import Paper from '@mui/material/Paper';
import AddIcon from "@mui/icons-material/Add";

const SelectList = (props) => {
  const {options , labs ,onChange, onSearch , types , searchvalue, handleSearchByType, handleAdd, role } = props;
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
            <Paper elevation={2}>
              <div className="form-floating">
                <input
                  id="searchvalue"
                  type="text"
                  className="form-control" 
                  value={searchvalue}
                  onChange={(e) => handleSearchByType(e)}
                  placeholder="Type to search..."
                  autoComplete="off"
                />
                <label htmlFor="searchvalue">Type to search...</label>
              </div>
            </Paper>
          </div>

          <div className="col">
            <Paper elevation={2}>
              <div className="form-floating">
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
            </Paper>
          </div>
          <div className="col">
            <Paper elevation={2}>
              <div className="form-floating">
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
            </Paper>
          </div>
          <div className="col">
            <Paper elevation={2}>
              <div className="form-floating">
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
            </Paper>
          </div>

          <div className="col" style={{ display: 'flex', alignItems: "center", justifyContent: role === 'Technical Officer' ? 'space-between' : 'flex-end'}}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SearchIcon />}
              size="large"
              sx={{
                borderRadius: '22px',
                height: '44px',
                width: '102px',
                textTransform: 'capitalize',        
              }}
              onClick={(e) => onSearch(e)}
              disabled={
                options.lab === "" ||
                options.availability === "" ||
                options.type === ""
              }
            >
              Search
            </Button>
            {role === "Technical Officer" && (
            <Button
              variant="contained"
              color="success"
              startIcon={<AddIcon />}
              size="large"
              sx={{
                borderRadius: '22px',
                height: '44px',
                width: '102px',
                textTransform: 'capitalize',      
              }}
              onClick={(e) => handleAdd(e)}
            >
              Add
            </Button>)}
          </div>
        </div>
      </form>
    </div>
  );
};

export default SelectList;
