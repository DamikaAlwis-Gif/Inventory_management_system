import express from "express";
import db from "../dataBase/db.js";
import jwt from "jsonwebtoken";

const reservRouter = express.Router();

const getUser = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        return res.json({ err: err });
      } else {
        req.name = decoded.name;
        req.role = decoded.role;
        req.user_id = decoded.user_id;
        next();
      }
    });
  }
};
// get reservations of user with id in mobile app
reservRouter.get("/myReservations/:id", (req, res) => {
  const u_id=req.params.id;
  const q =
    "SELECT resource_id,name, start_date, end_date FROM reservation join resource using (resource_id) where user_id= ? and status= 'Due';";
  db.query(q, [u_id],(err, data) => {
    if (err) return res.json(err);
    else {     
      return res.json({
        data: data
      
      });
     
    } 

  });
});

reservRouter.get("/all", (req, res) => {
   
   const q = "SELECT * FROM reservation;";
   db.query(q, [],(err, data) => {
 
    
 
     if (err) return res.json(err);
     else {     
       return res.json(data);
     } 
 
   });
 });

 reservRouter.get("/myReservations/",getUser, (req, res) => {
  const u_id=req.user_id;
  const q = "SELECT * FROM reservation where user_id=?;";
  db.query(q, [u_id],(err, data) => {
    if (err) return res.json(err);
    else {     
      return res.json(data);
     /*
     const response = {
      name: req.name,
      data: data
    };;
    return res.json(response);  */
    } 

  });
});

//get reservation table data for the requested id
reservRouter.get("/reservation/:id", (req, res) => {
  const resource_id = req.params.id;
  const q = "SELECT starting_time,ending_time FROM unavailability WHERE resource_id = ? ;";
  db.query(q, [resource_id], (err, data) => {
    if (err) return res.json(err);
    else return res.json(data);
  });
 // myfunc();
});

//save and find conflicts in reservation times
reservRouter.post("/reservedate",getUser, (req, res) => {

  const q =
   "INSERT INTO reservation (`user_id`,`resource_id`,`start_date`,`end_date`,`status`,`purpose`,`reservation_type`) values (?)";
 
   const r =
   "INSERT INTO unavailability (`resource_id`,`starting_time`,`ending_time`) values (?)";
   


   //const start_time_unav=  new Date(year, month - 1, day, hour, minute, second);
   const start_time_unav= new Date(req.body.start_dt + ":00.000Z");
   const end_time_unav= new Date(req.body.end_dt + ":00.000Z");

   const values_for_anav=[req.body.resource_id,start_time_unav,end_time_unav];
   

   const values = [
   req.user_id,
   req.body.resource_id,
   start_time_unav,
   end_time_unav,
   req.body.status,
   req.body.purpose,
   req.body.reservation_type,

 ];
 //console.log(values);

 if(end_time_unav<=start_time_unav){
  // console.log("it happens");
   return res.json("start_end_error");
 }
 
 chkConflicts(req.body.resource_id,start_time_unav,
   end_time_unav,
  (result) => {
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


// unavilability-reservation clash handle
let chkConflicts=(res_id,start_date,end_date,callback)=>{
  var flag=true;
  
  const sql = 'SELECT starting_time,ending_time FROM unavailability WHERE resource_id=?;';
  
  db.query(sql,[res_id], (queryErr, results) => {
    if (queryErr) {
      console.error('Error executing the query: ' + queryErr.stack);
      return;
    }
  
    if (results.length > 0) {
      //callback(true);
      for (let i = 0; i < results.length; i++) {
       
      
      // Assuming the datetime is the first result in the query
      const unav_start = results[i].starting_time;
      const unav_end = results[i].ending_time;
  
     
  
        if((start_date<unav_start & end_date<unav_start)||(start_date>unav_end)){
         // console.log("okay1");
         
          
        }else{
         // console.log("not okay1");
          flag=false;
         // callback(false);
          break;
        
        }
  
      }callback(flag);
  
    }else{
      flag=true;
      callback(flag);
    }
  
  });
  
  
  };

export default reservRouter;