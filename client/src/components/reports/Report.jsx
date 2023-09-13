import React from 'react'
import ReservationReport from './ReservationReport';
import CheckOutInReport from './CheckOutInReport';
import MaintenanceReport from './MaintenanceReport';

const Report = (props) => {
    const {selectedRadio , accessLab} = props;
    
  return (
    <div>
      {selectedRadio === "reservation" ? (<ReservationReport/>):
       selectedRadio === "check_in_check_out" ? 
       (<CheckOutInReport 
        accessLab={accessLab}
        ></CheckOutInReport>): 
       selectedRadio === "maintenance" ? (<MaintenanceReport/>): null}
    </div>
  );
}
 
export default Report