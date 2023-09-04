import React from 'react'

const FormItemSelect = (props) => {
    const {name, title, list , value , onChange} = props;
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
          <option disabled>Select</option>
          {list.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default FormItemSelect