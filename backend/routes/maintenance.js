import express from "express";
import db from "../dataBase/db.js";

const maintenanceRouter = express.Router();

const TempMaintenanceData = {
  maintenance: [],
  unavialability: [],
  del_records: []
 
};

//fetching everything from maintenance table
maintenanceRouter.get("/all", (req, res) => {
   
    const q = "SELECT * FROM maintenance;";
    db.query(q, [],(err, data) => {   
  
      if (err) return res.json(err);
      else {     
        return res.json(data);
      } 
  
    });
  });

  //get maintenance table data for the requested id
  maintenanceRouter.get("/resmaintenance/:id", (req, res) => {
  const resource_id = req.params.id;
  const q = "SELECT maintenance_id,maintenance_type,start_date,completion_date,status FROM maintenance WHERE resource_id = ? ;";
  db.query(q, [resource_id], (err, data) => {
    if (err) return res.json(err);
    else return res.json(data);
  });

});

//handle adding new maintenance schedule
maintenanceRouter.post("/maintenaceadd", (req, res) => {

  const q =
    "INSERT INTO maintenance (`resource_id`,`maintenance_type`,`start_date`,`completion_date`,`status`) values (?)";
  
    const r =
    "INSERT INTO unavailability (`resource_id`,`starting_time`,`ending_time`) values (?)";
    
    const start_datetime=  new Date(req.body.start_date + ":00.000Z");
    const end_datetime=  new Date(req.body.completion_date + ":00.000Z");

    const values_for_anav=[req.body.resource_id,start_datetime,end_datetime];
  
    const values = [
      req.body.resource_id,
      req.body.maintenance_type,
      start_datetime,
      end_datetime,
      req.body.status,   
    ];

    if(end_datetime<=start_datetime){
       return res.json("start_end_error");
     }

   //  return res.json("bb");

   chkResvConflicts(req.body.resource_id,start_datetime,
      end_datetime,
      (result) => {
      
        if(result.length==0){
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
          TempMaintenanceData.maintenance=values;
          TempMaintenanceData.unavialability=values_for_anav;
          return res.json(result);
        }
  
    });
    

});

//Fetch Maintenace clash data
maintenanceRouter.post("/maintenanceClash/", (req, res) => {
  //const resource_id = req.params.id;
  const res_id_values=req.body;
  TempMaintenanceData.del_records=res_id_values;
  const q = "SELECT * FROM reservation WHERE reservation_id IN (?);";
  db.query(q, [res_id_values], (err, data) => {
    if (err){ return res.json(err);}
    else{ 
      //console.log("data is: "+data);
     // console.log(TempMaintenanceData);
      return res.json(data);}
  });
  

});

//Delete clashing reservations and adding maintenance
maintenanceRouter.put("/maintenanceDelUpdate", (req, res) => {

  const p = "INSERT INTO maintenance (`resource_id`,`maintenance_type`,`start_date`,`completion_date`,`status`) values (?);";
    const q ="INSERT INTO unavailability (`resource_id`,`starting_time`,`ending_time`) values (?)";
    const r =`DELETE FROM reservation WHERE reservation_id IN (?)`;
  
    db.query(p, [TempMaintenanceData.maintenance], (err, data) => {
      if (err) {console.log(err);return res.json(err);}
      else {
        db.query(q, [TempMaintenanceData.unavialability], (err, data) => {
          if (err) return res.json(err);
          else{
            db.query(r, [TempMaintenanceData.del_records], (err, data) => {
              if (err) {console.log(err);return res.json(err);}
              else return res.json("Done");
            });
          } 
        });
      }
    }); 
   
  });


  //changing status of maintenance as "done"
  maintenanceRouter.get("/updtmtschedule/:id", (req, res) => {
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


let chkResvConflicts=(res_id,start_date,end_date,callback)=>{
  //var flag=true;
  let container=[];
  // implement for checkin-checkout as well.................!
  const sql = 'SELECT reservation_id,start_date,end_date FROM reservation WHERE resource_id=?;';
  
  db.query(sql,[res_id], (queryErr, results) => {
    if (queryErr) {
      console.error('Error executing the query: ' + queryErr.stack);
      return;
    }
  
    if (results.length > 0) {
      for (let i = 0; i < results.length; i++) {
       
      // Assuming the datetime is the first result in the query
      const unav_start = results[i].start_date;
      const unav_end = results[i].end_date;
  
        if((start_date<unav_start & end_date<unav_start)||(start_date>unav_end)){
         // console.log("okay1");
         
          
        }else{
         // console.log("not okay1");
         // flag=false;
          container.push(results[i].reservation_id);
          // break;
        
        }
  
      }callback(container);
  
    }else{
      //flag=true;

      callback(container);
    }
  
  });
};


export default maintenanceRouter;