import express from "express";
import db from "../dataBase/db.js";

const router = express.Router();
//
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
    
        return res.json(data);}
    });
});
router.get("/maintenance/:resource_id/:start_date/:end_date/:status/:lab/:labs", (req, res) => {});
router.get("/reservation/:resource_id/:start_date/:end_date/:status/:lab/:labs", (req, res) => {});

router.get("/availability/:labs", (req, res) => {
    const labsParam = req.params.labs;
    let labs = labsParam ? labsParam.split(",") : [];
    const q =
      "select availability , count(availability) as count  from resource where lab_name in (?) group by availability order by count desc;";
    db.query(q, [labs], (err, data) => {
        if (err) {
            console.log(err);
        return res.json(err);
        } else {
            // console.log(data);
        return res.json(data);
        }
    });
});
router.get("/condition/:labs", (req, res) => {
  const labsParam = req.params.labs;
  let labs = labsParam ? labsParam.split(",") : [];
  const q =
    "select resource_condition , count(resource_condition) as count  from resource where lab_name in (?) group by resource_condition order by count desc;";
  db.query(q, [labs], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      // console.log(data);
      return res.json(data);
    }
  });
});
router.get("/checkoutstatus/:labs", (req, res) => {
  const labsParam = req.params.labs;
  let labs = labsParam ? labsParam.split(",") : [];
  const q =
    "select status , count(status) as count  from check_in_out_view where lab_name in (?) and status != 'Checked-in' group by status order by count desc;";
  db.query(q, [labs], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      // console.log(data);
      return res.json(data);
    }
  });

});




export default router;
