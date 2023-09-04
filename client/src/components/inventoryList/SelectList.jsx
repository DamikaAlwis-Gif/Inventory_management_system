import React from "react";

const SelectList = (props) => {
  const {options , labs ,onChange, onSearch } = props;
  return (
    <div>
      <form>
        <div className="row">
          <div className="col">
            <select
              className="form-select"
              value={options.lab}
              name="lab"
              onChange={(e) => onChange(e)}
            >
              <option disabled >
                Select a lab
              </option>
              <option value="All">All</option>
              {labs.map(lab => <option key={lab} value={lab}>{lab}</option>)}
            </select>
          </div>
          <div className="col">
            <select
              className="form-select"
              value={options.availability}
              name="availability"
              onChange={(e) => onChange(e)}
            >
              <option disabled >
                Select availability
              </option>
              <option value="All">All</option>

              <option value="Available">Available</option>
              <option value="not_available">Not Available</option>
            </select>
          </div>
          <div className="col">
            <button

              className="btn btn-primary btn-sm"
              onClick={(e) => onSearch(e)}
              disabled={options.lab === "Select a lab" || options.availability === "Select availability"}
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SelectList;
