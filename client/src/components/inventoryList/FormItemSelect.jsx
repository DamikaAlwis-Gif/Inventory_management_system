import React from 'react'
import Alert from "@mui/material/Alert";
const FormItemSelect = (props) => {
    const {name, title, list , value , onChange, error} = props;
  return (
    <>
      <div className="form-group col">
        <label htmlFor={name} className="form-label ">
          {title}
        </label>
        <select
          className="form-select"
          name={name}
          value={value}
          onChange={(e) => onChange(e)}
        >
          <option value="" disabled>
            Choose..
          </option>
          {list.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        {error && <Alert severity="error">{error}</Alert>}
      </div>
    </>
  );
}

export default FormItemSelect