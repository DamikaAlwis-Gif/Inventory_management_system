import React from 'react'
import { useState } from 'react'
import Report from './Report';

const ReportSection = () => {
    const [selectedRadio, setSelectedRadio] = useState(""); // Initialize with the ID of the initially checked radio button

    const handleRadioChange = (event) => {
      setSelectedRadio(event.target.id);
    };

  return (
    <div>
      <h2 className="text-center">Reports</h2>
      <div className="container">
        <div className="mt-4">
          <div className="btn-group btn-group-sm " role="group">
            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="reservation"
              autoComplete="off"
              checked={selectedRadio === "reservation"}
              onChange={handleRadioChange}
            />
            <label className="btn btn-outline-primary" htmlFor="reservation">
              Reservation
            </label>

            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="check_in_check_out"
              autoComplete="off"
              checked={selectedRadio === "check_in_check_out"}
              onChange={handleRadioChange}
            />
            <label
              className="btn btn-outline-primary"
              htmlFor="check_in_check_out"
            >
              Check-in/ Check-out
            </label>

            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="maintenance"
              autoComplete="off"
              checked={selectedRadio === "maintenance"}
              onChange={handleRadioChange}
            />
            <label className="btn btn-outline-primary" htmlFor="maintenance">
              Maintenance
            </label>
          </div>
          <Report selectedRadio={selectedRadio} />
        </div>
      </div>
    </div>
  );
}

export default ReportSection