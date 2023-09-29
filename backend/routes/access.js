import express from "express";
import db from "../dataBase/db.js";
const router = express.Router();

router.get("/view/:id", (req, res) => {
    const id = req.params.id;
    const q = "SELECT name FROM accessview where user_id = ?;";
    db.query(q, [id], (err, data) => {
        if (err) {
            res.json({ err: err });
            console.log(err);
            console.log(data);
        }
        else {
            console.log(data);
            res.json(data);
        }
    });
    
});
router.get("/users/:usertype", (req, res) => {
    console.log("in users");
    const userType = req.params.usertype;
    let q = "";
    if (userType ==="All"){
     q = "SELECT user_id, name FROM user;";
    }
    else{
         q = "SELECT  user_id, name FROM user where role = ?;";
    }
   
    db.query(q, [userType], (err, data) => {
        if (err) {
            console.log(err);
            res.json({ err: err }); 
        }
        else {
            res.json(data);
        }
    });
});




export default router;