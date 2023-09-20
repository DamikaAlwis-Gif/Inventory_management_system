import React from 'react'
import TableReport from './TableReport';
import { Paper } from '@mui/material';
const Report = (props) => {
 
  const {
    accessLab,
    statusList,
    columns,
    details,
    formDetails,
    handleChange,
    handleForm
  } = props;
  
  
  const { resource_id, start_date, end_date, status, lab } = formDetails;
  

  return (
    <div className="row mt-3">
      <div className="col ">
        <Paper elevation={2}>
          <div className="form-floating mb-3 ">
            <input
              type="date"
              className="form-control"
              id="start_date"
              value={start_date}
              name="start_date"
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="start_date">Start Date</label>
          </div>
        </Paper>
      </div>
      <div className="col ">
        <Paper elevation={2}>
          <div className="form-floating mb-3">
            <input
              type="date"
              className="form-control"
              id="end_date"
              name="end_date"
              value={end_date}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="end_date">End Date</label>
          </div>{" "}
        </Paper>
      </div>
      <div className="col ">
        <Paper elevation={2}>
          <div className="form-floating mb-3">
            <input
              type="number"
              className="form-control"
              id="resource_id"
              value={resource_id}
              name="resource_id"
              placeholder="Resource ID"
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="resource_id">Resource ID</label>
          </div>
        </Paper>
      </div>
      <div className="col ">
        <Paper elevation={2}>
          <div className="form-floating mb-3">
            <select
              className="form-select"
              name="lab"
              value={lab}
              onChange={(e) => handleChange(e)}
            >
              <option value="All">All</option>
              {accessLab.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <label htmlFor="status">Labs</label>
          </div>
        </Paper>
      </div>
      <div className="col ">
        <Paper elevation={2}>
          <div className="form-floating mb-3">
            <select
              className="form-select"
              name="status"
              value={status}
              onChange={(e) => handleChange(e)}
            >
              {statusList.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <label htmlFor="status">Status</label>
          </div>{" "}
        </Paper>
      </div>
      <div className="col">
        <button
          className="btn btn-primary btn-sm"
          onClick={(e) => handleForm(e)}
        >
          Search
        </button>
      </div>
      {details && details.length !== 0 ? (
        <TableReport details={details} columns={columns} />
      ) : (
        <div className="container text-center p-5">
          <p className="display-6 ">No records found!</p>
        </div>
      )}
    </div>
  );
}

export default Report;