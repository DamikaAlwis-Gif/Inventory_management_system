import React from 'react'

const FormItem = (props) => {
    const {placeholder, title, value, onChange, name , type }= props;
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
          required
        />
        <div className="invalid-feedback">Please provide a valid input!</div>
      </div>
    </>
  );
}

export default FormItem