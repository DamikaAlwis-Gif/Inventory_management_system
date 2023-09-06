import express from "express";
import db from "../dataBase/db.js";

const resourceRouter = express.Router();
//let flag;

resourceRouter.get("/:labs", (req, res) => {
   const labsParam = req.params.labs;
   const labs = labsParam ? labsParam.split(",") : [];
 
  //console.log(labs);
  const q = "SELECT * FROM first_view WHERE lab_name IN (?) ;";
  db.query(q, [labs],(err, data) => {
    if (err) {
             // console.log(err);
              return res.json(err);}
    else{
      // console.log(data);
       return res.json(data);
     } // sends a json responce
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

//get maintenance table data for the requested id
resourceRouter.get("/maintenance/:id", (req, res) => {
  const resource_id = req.params.id;
  const q = "SELECT maintenance_id,maintenance_type,start_date,completion_date,status FROM maintenance WHERE resource_id = ? ;";
  db.query(q, [resource_id], (err, data) => {
    if (err) return res.json(err);
    else return res.json(data);
  });

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
    req.body.lab_name,
    req.body.location,
    req.body.availability,
    req.body.resource_condition,
    req.body.is_portable,
    req.body.last_maintenance_date,
    req.body.maintenance_interval,
    req.body.img_url,
  ];
  db.query(q, [values], (err, data) => {

    if (err) res.json({status: "not ok"});
    else return res.json({status: "ok"});
  });
});


//save and find conflicts in reservation times
resourceRouter.post("/reservedate", (req, res) => {

   const q =
    "INSERT INTO reservation (`user_id`,`resource_id`,`start_date`,`start_time`,`end_date`,`end_time`,`status`,`purpose`,`reservation_type`) values (?)";
  
    const r =
    "INSERT INTO unavailability (`resource_id`,`starting_time`,`ending_time`) values (?)";
    
    let [year, month, day] = req.body.start_date.split('-');
    let [hour, minute, second] = req.body.start_time.split(':');

    const start_time_unav=  new Date(year, month - 1, day, hour, minute, second);

     [year, month, day] = req.body.end_date.split('-');
     [hour, minute, second] = req.body.end_time.split(':');

    const end_time_unav=  new Date(year, month - 1, day, hour, minute, second);
    const values_for_anav=[req.body.resource_id,start_time_unav,end_time_unav];
    

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

  if(end_time_unav<=start_time_unav){
   // console.log("it happens");
    return res.json("start_end_error");
  }
   
  chkConflicts(req.body.start_date,
    req.body.start_time,
    req.body.end_date,
    req.body.end_time,(result) => {
    //console.log(result); // This will log either true or false based on the query result

      if(result){
          db.query(q, [values], (err, data) => {
           if (err){ 
            console.log(err);
            return res.json(err);}
           else{
              db.query(r, [values_for_anav], (err, data) => {
              if (err) console.log(err);
              else console.log("updated unavailability table");
              }); 
             return res.json("Done");
            }
           }); 
        //return res.json("no conflict");
      }else{
        return res.json("confilct");
      }

  });
  
});


resourceRouter.get("/usermore/:id", (req, res) => {
  const resource_id = req.params.id;
  const q = "SELECT * FROM userview WHERE resource_id = ?;";
  db.query(q, [resource_id], (err, data) => {
    if (err) return res.json(err);
    else return res.json(data);
  });

});
resourceRouter.get("/update/:id", (req, res) => {
  const resource_id = req.params.id;
  //console.log(resource_id);
  const q = "SELECT * FROM resource WHERE resource_id = ?;";
  db.query(q, [resource_id], (err, data) => {
    if (err) return res.json(err);
    else {
      //console.log(data);
      return res.json(data)};
    
  });
});
resourceRouter.put("/update/:id", (req, res) => {
  const resource_id = req.params.id;
  const q =
  "UPDATE resource SET name = ?, resource_type = ?, model = ?, serial_number = ?, specifications = ?, lab_name = ?, location = ?, availability = ?, resource_condition = ?, is_portable = ?, last_maintenance_date = ?, maintenance_interval = ?, img_url = ? WHERE resource_id = ?;";
    
  
  db.query(
    q,
    [
      req.body.name,
      req.body.resource_type,
      req.body.model,
      req.body.serial_number,
      req.body.specifications,
      req.body.lab_name,
      req.body.location,
      req.body.availability,
      req.body.resource_condition,
      req.body.is_portable,
      req.body.last_maintenance_date,
      req.body.maintenance_interval,
      req.body.img_url,
      resource_id,
    ],
    (err, data) => {
      if (err) return res.json({status: "not ok"});
      else return res.json({status: "ok"} );
    }
  );
});



//changing status of maintenance as "done"
resourceRouter.get("/updtmtschedule/:id", (req, res) => {
  const maintenance_id=req.params.id;
  const q = "UPDATE maintenance SET status = 'Done' WHERE maintenance_id = ?;"
  db.query(q, [maintenance_id], (err, data) => {
    if (err) {
      console.log(err);
     // console.log("hello");
      return res.json(err);}
    else return res.json(maintenance_id);
  });
  
});


// unavilability-reservation clash handle
 let chkConflicts=(start_date,start_time,end_date,end_time,callback)=>{
var flag=true;

const sql = 'SELECT starting_time,ending_time FROM unavailability WHERE resource_id=7';

db.query(sql, (queryErr, results) => {
  if (queryErr) {
    console.error('Error executing the query: ' + queryErr.stack);
    return;
  }

  if (results.length > 0) {
    //callback(true);
    for (let i = 0; i < results.length; i++) {
     
    
    // Assuming the datetime is the first result in the query
    const datetimeValue1 = results[i].starting_time;
    const datetimeValue2 = results[i].ending_time;

    const unav_start = new Date(datetimeValue1);
    const unav_end = new Date(datetimeValue2);
   

      //perform check per row

      let [year, month, day] = start_date.split('-');
      let [hour, minute, second] = start_time.split(':');

      const usr_start=  new Date(year, month - 1, day, hour, minute, second);


       [year, month, day] = end_date.split('-');
       [hour, minute, second] = end_time.split(':');

       const usr_end=  new Date(year, month - 1, day, hour, minute, second);

      if((usr_start<unav_start & usr_end<unav_start)||(usr_start>unav_end)){
       // console.log("okay1");
       
        
      }else{
       // console.log("not okay1");
        flag=false;
       // callback(false);
        break;
      
      }

    }callback(flag);

  }

});


};

export default resourceRouter;
