import React from 'react'
import Alert from "@mui/material/Alert";
const FormItem = (props) => {
    const {placeholder, title, value, onChange, name , type, error }= props;
  return (
    <>
      <div className="form-group  col">
        <label htmlFor={name} className="form-label ">
          {title}
        </label>
        <input
          type={type}
          className="form-control"
          id={name}
          value={value}
          onChange={(e) => onChange(e)}
          name={name}
          placeholder={placeholder}
        />
        {error && (
          <Alert severity="error">{error}</Alert>
        )}
        
      </div>
    </>
  );
}

export default FormItem