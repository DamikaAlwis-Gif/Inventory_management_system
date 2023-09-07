import React from "react";

const SelectList = (props) => {
  const {options , labs ,onChange, onSearch , types , searchvalue, handleSearchByType } = props;
  return (
    <div>
      <form>
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              value={searchvalue}
              onChange={(e) => handleSearchByType(e)}
              placeholder="Type something to search"
            />
          </div>

          <div className="col">
            <select
              className="form-select"
              value={options.lab}
              name="lab"
              onChange={(e) => onChange(e)}
            >
              <option value="" disabled>
                Select a lab
              </option>
              <option value="All">All</option>
              {labs.map((lab) => (
                <option key={lab} value={lab}>
                  {lab}
                </option>
              ))}
            </select>
          </div>
          <div className="col">
            <select
              className="form-select"
              value={options.type}
              name="type"
              onChange={(e) => onChange(e)}
            >
              <option value="" disabled>
                Select type
              </option>
              <option value="All">All</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="col">
            <select
              className="form-select"
              value={options.availability}
              name="availability"
              onChange={(e) => onChange(e)}
            >
              <option value="" disabled>
                Select availability
              </option>
              <option value="All">All</option>

              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
          </div>

          <div className="col">
            <button
              className="btn btn-primary btn-sm"
              onClick={(e) => onSearch(e)}
              disabled={
                options.lab === "" ||
                options.availability === "" ||
                options.type === ""
              }
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
