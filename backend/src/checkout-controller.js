import db from "../dataBase/db.js";

export async function checkOutLogic (req, res)  {
  try {
    const { userId, resourceId, checkoutDatetime, dueDatetime, retDatetime, purpose } = req.body;

    const lastCheckoutSql = 'SELECT user_id,resource_id,`status` FROM check_in_check_out WHERE resource_id = ? ORDER BY check_out_datetime DESC LIMIT 1';

    db.query(lastCheckoutSql, [resourceId], (err, dataCheckout) => {
      console.log(dataCheckout);

      if (dataCheckout !== undefined &&
        (dataCheckout[0] !== undefined &&
        (dataCheckout[0].status === 'Checked-out' || dataCheckout[0].status === 'Overdue'))) {

        console.log(`Item with the Resource ID you entered is currently checked out.`);
        res.status(409).json({message: `Item with the Resource ID you entered is currently checked out.`}); 
      }
      else {
        const maintenanceSql = 'SELECT COUNT(*) AS maintenanceCount FROM maintenance WHERE resource_id = ? AND ((start_date BETWEEN ? AND ?) OR status = "under-maintenance")';

        db.query(maintenanceSql, [resourceId, checkoutDatetime, retDatetime], (err, dataMaintenance) => {
        console.log(dataMaintenance);

        if (dataMaintenance !== undefined &&
          (dataMaintenance[0] !== undefined &&
          dataMaintenance[0].maintenanceCount > 0)) {

          console.log('This item is scheduled for maintenance within the period you specified.');
          res.status(490).json({message: 'This item is scheduled for maintenance within the period you specified.'});
        }
        else {
          const reservationSql = 'SELECT COUNT(*) AS reservationCount FROM reservation WHERE resource_id = ? AND ((start_date BETWEEN ? AND ?) OR status = "ongoing-reservation")';

          db.query(reservationSql, [resourceId, checkoutDatetime, retDatetime], (err, dataReservation) => {
          console.log(dataReservation);

          if (dataReservation !== undefined &&
            (dataReservation[0] !== undefined &&
            dataReservation[0].reservationCount > 0)) {
            console.log('This item is reserved for use within the period you specified.');
            res.status(490).json({message: `This item is reserved for use within the period you specified.`});
          }
          else {
            const insertSql = 'INSERT INTO check_in_check_out (resource_id, user_id,  check_out_datetime, due_datetime, status, purpose) VALUES (?, ?, ?, ?, ?, ?)';
      
            db.query(insertSql, [resourceId, userId, checkoutDatetime, dueDatetime, "Checked-out", purpose]);
        
            res.status(200).json({message: 'Check-out successful.'});
          }
          });
        }
        });
      }
      });
  } catch (error) {
    console.error(error);

    let errorMessage = 'An error occurred while processing the check-out';

    // if (error instanceof DatabaseError) {
    //   errorMessage = `Database query failed: ${error.message}`;
    // } else if (error instanceof ValidationError) {
    //   errorMessage = `Validation failed: ${error.message}`;
    // }

    res.status(500).json({message: errorMessage});
  }

}
