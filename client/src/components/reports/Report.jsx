import React from 'react'
import { Form } from 'react-router-dom';
import FormItem from '../inventoryList/FormItem';
import { useState } from 'react';
import axios from 'axios';
const Report = (props) => {
    const {selectedRadio} = props;
    const [date, setDate] = useState({});
    const handleChange = (e) => {
        setDate(e.target.value);
    };
    const[details , setDetails] = useState({});
    console.log(date);
    const handleForm = (e) => {
        e.preventDefault();
        try {
            const res = axios.get(`http://localhost:8800/resources/report/${selectedRadio}/${date}`);
        } catch (error) {
            
        }
        console.log(date);
    };
  return (
    <div>
      {selectedRadio !== "" ? (
        <div className='mt-2'>
          <div className="row">
            <div className="col-2">
              <form>
                <input
                  type= "date"
                  className="form-control"
                  id="date"
                  value={date}
                  onChange={(e) => handleChange(e)}
                />
              </form>
            </div>
            <div className="col">
              <button className="btn btn-primary btn-sm" onClick={(e)=>handleForm(e)}> Search</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Report