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
    if (err) console.log(err);
    else return res.json("Asset has been created successfully");
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
      if (err) console.log(err);
      else return res.json("Asset has been updated successfully");
    }
  );
});



export default resourceRouter;
