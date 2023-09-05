import express from "express";
import db from "../dataBase/db.js";

const resourceRouter = express.Router();

resourceRouter.get("/:labs", (req, res) => {
  
   const labsParam = req.params.labs;
   const labs = labsParam ? labsParam.split(",") : [];
 
  //console.log(labs);
  const q = "SELECT * FROM first_view WHERE lab_name IN (?) ;";
  db.query(q, [labs],(err, data) => {
    if (err) return res.json(err);
    else return res.json(data); // sends a json responce
  });
});

resourceRouter.get("/adminmore/:id", (req, res) => {
  const resource_id = req.params.id;
  const q = "SELECT * FROM resource WHERE resource_id = ? ;";
  db.query(q, [resource_id], (err, data) => {
    if (err) return res.json(err);
    else return res.json(data);
  });
});

//get reservation table data for the requested id
resourceRouter.get("/reservation/:id", (req, res) => {
  const resource_id = req.params.id;
  const q = "SELECT starting_time,ending_time FROM unavailability WHERE resource_id = ? ;";
  db.query(q, [resource_id], (err, data) => {
    if (err) return res.json(err);
    else return res.json(data);
  });
 // myfunc();
});


resourceRouter.delete("/:id", (req, res) => {
  const resource_id = req.params.id;
  const q = "DELETE FROM resource  WHERE resource_id = ?;";
  db.query(q, [resource_id], (err, data) => {
    if (err) return res.json(err);
    else return res.json(data);
  });
});

resourceRouter.post("/", (req, res) => {
  const q =
    "INSERT INTO resource (`name`,`resource_type`,`model`,`serial_number`,`specifications`,`lab_name`,`location`,`availability`,`resource_condition`,`is_portable`,`last_maintenance_date`,`maintenance_interval`,`img_url`) values (?)";
  const values = [
    req.body.name,
    req.body.resource_type,
    req.body.model,
    req.body.serial_number,
    req.body.specifications,
    req.body.lab_id,
    req.body.location,
    req.body.availability,
    req.body.resource_condition,
    req.body.is_portable,
    req.body.last_maintenance_date,
    req.body.maintenance_interval,
    req.body.img_url,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    else return res.json("Asset has been created successfully");
  });
});


//save and find conflicts in reservation times
resourceRouter.post("/reservedate", (req, res) => {
  if(myfunc(req.body.start_date,
    req.body.start_time,
    req.body.end_date,
    req.body.end_time)){
      console.log("true");
    }else{
      console.log("false");
    }
  const q =
    "INSERT INTO reservation (`user_id`,`resource_id`,`start_date`,`start_time`,`end_date`,`end_time`,`status`,`purpose`,`reservation_type`) values (?)";
  const values = [
    req.body.user_id,
    req.body.resource_id,
    req.body.start_date,
    req.body.start_time,
    req.body.end_date,
    req.body.end_time,
    req.body.status,
    req.body.purpose,
    req.body.reservation_type,
  
  ];
/*  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    else return res.json("Reservation created successfully !");
  }); */
});


resourceRouter.get("/usermore/:id", (req, res) => {
  const resource_id = req.params.id;
  const q = "SELECT * FROM userview WHERE resource_id = ?;";
  db.query(q, [resource_id], (err, data) => {
    if (err) return res.json(err);
    else return res.json(data);
  });

});


// unavilability-reservation clash handle
 let myfunc=(start_date,start_time,end_date,end_time)=>{
var valid=true;
const sql = 'SELECT starting_time,ending_time FROM unavailability WHERE resource_id=7';

db.query(sql, (queryErr, results) => {
  if (queryErr) {
    console.error('Error executing the query: ' + queryErr.stack);
    return;
  }

  if (results.length > 0) {
   
    for (let i = 0; i < results.length; i++) {
     
    
    // Assuming the datetime is the first result in the query
    const datetimeValue1 = results[i].starting_time;
    const datetimeValue2 = results[i].ending_time;

    // Extract year, month, day, and hour
    const unav_start = new Date(datetimeValue1);
   /* const year1 = datetime1.getFullYear();
    const month1 = datetime1.getMonth() + 1; // Months are zero-indexed
    const day1 = datetime1.getDate();
    const hour1 = datetime1.getHours(); 

    // Put the extracted components into an array
    const start_dt = [year1, month1, day1, hour1];

    console.log('Datetime components:', start_dt); */

    //duplication
     // Extract year, month, day, and hour
     const unav_end = new Date(datetimeValue2);
   /*  const year2 = datetime2.getFullYear();
     const month2 = datetime2.getMonth() + 1; // Months are zero-indexed
     const day2 = datetime2.getDate();
     const hour2 = datetime2.getHours();
 
     // Put the extracted components into an array
     const end_dt = [year2, month2, day2, hour2];
 
     console.log('Datetime components:', end_dt); */

      //perform check per row

      let [year, month, day] = start_date.split('-');
      let [hour, minute, second] = start_time.split(':');

      const usr_start=  new Date(year, month - 1, day, hour, minute, second);


       [year, month, day] = end_date.split('-');
       [hour, minute, second] = end_time.split(':');

       const usr_end=  new Date(year, month - 1, day, hour, minute, second);


      /*if(usr_start<unav_start & usr_end<unav_start){
        console.log("okay");
      }else if(usr_start>unav_end){
        console.log("okay");
      }else{
        console.log("not okay");
      }
      */
      if((usr_start<unav_start & usr_end<unav_start)||(usr_start>unav_end)){
        console.log("okay1");
        valid=true;
        
      }else{
        console.log("not okay1");
        valid=false;
        break;
      
      }

    }

  }

});
return valid;

};

export default resourceRouter;
