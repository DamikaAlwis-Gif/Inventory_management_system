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





export default router;
