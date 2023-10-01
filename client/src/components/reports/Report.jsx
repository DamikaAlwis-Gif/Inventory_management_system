import React from 'react'
import TableReport from './TableReport';
import Button from '@mui/material/Button';
import SearchIcon from "@mui/icons-material/Search";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

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
      <div className="col">
        <Paper elevation={2}>
          <div className="form-floating">
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
          <div className="form-floating">
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
          <div className="form-floating">
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
          <div className="form-floating">
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
          <div className="form-floating">
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
      <div className="col" style={{ display: 'flex', alignItems: "center", justifyContent: 'flex-end'}}>
      <ThemeProvider theme={darkTheme}>
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
              onClick={(e) => handleForm(e)}
            >Search</Button>
      </ThemeProvider>
      </div>
      {details && details.length !== 0 ? (
        <TableReport details={details} columns={columns} />
      ) : (
        <div className="container text-center p-5">
          <Typography
            variant="h5"
            align="center"
            style={{color: '#f3e5f5', padding: "20px 0px 10px 0px"}}>
              No records found!
          </Typography>
        </div>
      )}
    </div>
  );
}

export default Report;
