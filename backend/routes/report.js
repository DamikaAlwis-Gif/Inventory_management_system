import express from "express";
import db from "../dataBase/db.js";

const router = express.Router();

router.get("/:selectedRadio/:date", (req, res) => {
    const selectedRadio = req.params.selectedRadio;
    const date = req.params.date;
    const startDate = "";
    const q ="";
    if(selectedRadio === "maintenance"){
        startDate = "start_date";
    }else if(selectedRadio === "check_in_check_out"){
        startDate = "check_out_date";
    }
    else{
        startDate = "start_date";
    }
   "SELECT * FROM (?) WHERE (?) >=  DATE(?) ;";
    db.query(q, [ startDate ,selectedRadio, date], (err, data) => {
        if (err) return res.json(err);
        else return res.json(data);
    });
});

router.get("/check-out-in/:resource_id/:start_date/:end_date/:status/:lab/:labs", (req, res) => {
    const resource_id = req.params.resource_id;
    const start_date = req.params.start_date;
    const end_date = req.params.end_date; 
    const status = req.params.status;
    const lab = req.params.lab;
    const labsParam = req.params.labs;
    const labs = labsParam ? labsParam.split(",") : [];

    let q = "SELECT * FROM check_in_out_view WHERE ";
    let value =[];

    if(resource_id !== "All"){
        q = q + "resource_id = ? AND ";
        value.push(resource_id);
    }
    
    if(end_date !== "All"){
        q = q + "DATE(check_out_datetime) <= ? AND ";
        value.push(end_date);
    }
    if(status !== "All"){
        q = q + "status = ? AND ";
        value.push(status);
    }
    if (start_date !== "All") {
      q = q + "DATE(check_out_datetime) >= ? AND ";
      value.push(start_date);
    }
    if(lab !== "All"){
        q = q + "lab_name = ? AND ";
        value.push(lab);
    }
    if (labs.length > 0 && lab === "All") {
      q = q + "lab_name IN (?) AND ";
      value.push(labs);
    }

    q = q + "true;"
    
    db.query(q, value ,(err, data) => {
      if (err) {
        
        return res.json(err);}
      else {
        
        // if(data.length >0){
        //     const details =data.map((item) => {return {
        //         "check_in_out_id": item.check_in_out_id,
        //        "resource_id": item.resource_id,
        //        "name": item.name,
        //        "user_id": item.user_id,
        //        "lab_name": item.lab_name,
        //        "status": item.status,
        //        "check_out_datetime":
        //     }})
        // }
        
        return res.json(data);}
    });
});




export default router;
