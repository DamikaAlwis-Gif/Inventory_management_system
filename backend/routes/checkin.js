import express from "express";
import db from "../dataBase/db.js";

const checkinRouter = express.Router();

checkinRouter.post('/', async (req, res) => {
  try {
    const { userId, resourceId, checkinDatetime } = req.body;

    const lastCheckoutSql =
      `SELECT user_id, resource_id, status
      FROM check_in_check_out
      WHERE resource_id = ?
      ORDER BY check_out_datetime DESC LIMIT 1`;

    db.query(lastCheckoutSql, [resourceId], (err, dataCheckout) => {

      // console.log(dataCheckout);
      // console.log(dataCheckout[0]);
      // console.log(dataCheckout[0].status);
      // console.log(dataCheckout[0].user_id);

      if (dataCheckout === undefined || dataCheckout[0] === undefined) {
        console.log('There are no checkouts recorded for the given Resource ID.');
        res.status(409).json({message: `There are no checkouts recorded for the given Resource ID.`}); 
      
      } else if (!(dataCheckout[0].status === 'Checked-out' || dataCheckout[0].status === 'Overdue')) {
        console.log('This item is currently not checked-out.');
        res.status(409).json({message: `This item is currently not checked-out.`}); 
        
      } else if (dataCheckout[0].user_id !== userId) {
        console.log('The item was checked-out by a different user.');
        res.status(490).json({message: `The item was checked-out by a different user.`}); 

      } else {

        const updateSql =
          `UPDATE check_in_check_out
          SET status = "Checked-in", check_in_datetime = ?
          WHERE resource_id = ? AND user_id = ?
          ORDER BY check_out_datetime DESC LIMIT 1`;

        db.query(updateSql, [checkinDatetime, resourceId, userId]);
        console.log("Check-in successful.");
        res.status(200).json({message: `Check-in successful.`}); 
      }
      })  
    } catch (error) {
      console.log(error);

      let errorMessage = 'An error occurred while processing the check-out';

      if (error instanceof DatabaseError) {
        errorMessage = `Database query failed: ${error.message}`;
      } else if (error instanceof ValidationError) {
        errorMessage = `Validation failed: ${error.message}`;
      }
  
      res.status(500).json({message: errorMessage});
    }
  });

  export default checkinRouter;