// verify the token
// find the role, user id

// if the role is technical officer or office clerk:
// query firstview: find count of available, checked out, under maintenance & out of order items

// if the role is student or staff member:
// query check_in_out_view: find count of checked-out items for user id,
//                          out of the checked-out items for user id, the closest date to check-in
// do the same with reservation_view

import express from "express";
import jwt from "jsonwebtoken";
import db from "../dataBase/db.js";

const dashboardRouter = express.Router();

const getVerification = (req, res, next) => {

  const token = req.cookies.token;
  const secret_key = "jwtSecret";

  if (!token) {
    return res.json({ error: "No token!"})
  } else {
    jwt.verify(token, secret_key, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.json({ error: "Not authorized!"});
      } else {
        console.log(decoded);
        req.user_id = decoded.user_id;
        next();
        // return res.json({ status: "OK", user_id: decoded.user_id, role: decoded.role});
      }
    })
  }
}

const getStatistics = (req, res) => {

  console.log("\n\nHello from backend!")
  let labNames = [];

  const getLabsSql = "SELECT name FROM accessview WHERE user_id = ?;"
  db.query(getLabsSql, [req.user_id], (err, labData) => {

    if (err) {
      return res.json({ error: "An error occured while trying to query the database for 'labData'!" })

    } else {
      labNames = labData.map(row => row.name);
      console.log(labNames);

      const placeholders = labNames.map(() => '?').join(', ');

      const getStatsSql = `SELECT availability, COUNT(*) AS count FROM first_view WHERE lab_name IN (${placeholders}) GROUP BY availability`;
      db.query(getStatsSql, labNames, (err, statData) => {

        if (err) {
          console.log(err);
          return res.json({ error: "An error occured while trying to query the database for 'statData'!"})

        } else {
          console.log(statData);

          let finalStatData = {};
          statData.map((row) => {
            finalStatData[row.availability] = row.count;
          });
          console.log(finalStatData);

          return res.json({ 
            status: "OK",
            available: finalStatData['Available'],
            checkedOut: finalStatData['Checked out'],
            maintenance: finalStatData['Under maintenance'],
            outofOrder: finalStatData['Out of order']
          });
        }
      })
    }
  })
}

dashboardRouter.get("/", getVerification, getStatistics);
dashboardRouter.get("/verify", getVerification);
dashboardRouter.get("/data", getStatistics);

export default dashboardRouter;
