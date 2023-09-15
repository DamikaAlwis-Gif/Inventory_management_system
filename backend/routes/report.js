import express from "express";
import db from "../dataBase/db.js";
import moment from "moment";

const router = express.Router();
//
router.get("/check_in_check_out/:resource_id/:start_date/:end_date/:status/:lab/:labs",
  (req, res) => {
    const resource_id = req.params.resource_id;
    const start_date = req.params.start_date;
    const end_date = req.params.end_date;
    const status = req.params.status;
    const lab = req.params.lab;
    const labsParam = req.params.labs;
    const labs = labsParam ? labsParam.split(",") : [];

    let q = "SELECT * FROM check_in_out_view WHERE ";
    let value = [];

    if (resource_id !== "All") {
      q = q + "resource_id = ? AND ";
      value.push(resource_id);
    }

    if (end_date !== "All") {
      q = q + "DATE(check_out_datetime) <= ? AND ";
      value.push(end_date);
    }
    if (status !== "All") {
      q = q + "status = ? AND ";
      value.push(status);
    }
    if (start_date !== "All") {
      q = q + "DATE(check_out_datetime) >= ? AND ";
      value.push(start_date);
    }
    if (lab !== "All") {
      q = q + "lab_name = ? AND ";
      value.push(lab);
    }
    if (labs.length > 0 && lab === "All") {
      q = q + "lab_name IN (?) AND ";
      value.push(labs);
    }

    q = q + "true;";

    db.query(q, value, (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(data);
      }
    });
  }
);
router.get("/maintenance/:resource_id/:start_date/:end_date/:status/:lab/:labs", (req, res) => {
  const resource_id = req.params.resource_id;
  const start_date = req.params.start_date;
  const end_date = req.params.end_date;
  const status = req.params.status;
  const lab = req.params.lab;
  const labsParam = req.params.labs;
  const labs = labsParam ? labsParam.split(",") : [];

  let q = "SELECT * FROM maintenance_view WHERE ";
  let value = [];

  if (resource_id !== "All") {
    q = q + "resource_id = ? AND ";
    value.push(resource_id);
  }

  if (end_date !== "All") {
    q = q + "DATE(start_date) <= ? AND ";
    value.push(end_date);
  }
  if (status !== "All") {
    q = q + "status = ? AND ";
    value.push(status);
  }
  if (start_date !== "All") {
    q = q + "DATE(start_date) >= ? AND ";
    value.push(start_date);
  }
  if (lab !== "All") {
    q = q + "lab_name = ? AND ";
    value.push(lab);
  }
  if (labs.length > 0 && lab === "All") {
    q = q + "lab_name IN (?) AND ";
    value.push(labs);
  }

  q = q + "true;";

  db.query(q, value, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
  
});
router.get("/reservation/:resource_id/:start_date/:end_date/:status/:lab/:labs", (req, res) => {
  const resource_id = req.params.resource_id;
  const start_date = req.params.start_date;
  const end_date = req.params.end_date;
  const status = req.params.status;
  const lab = req.params.lab;
  const labsParam = req.params.labs;
  const labs = labsParam ? labsParam.split(",") : [];

  let q = "SELECT * FROM reservation_view WHERE ";
  let value = [];

  if (resource_id !== "All") {
    q = q + "resource_id = ? AND ";
    value.push(resource_id);
  }

  if (end_date !== "All") {
    q = q + "DATE(start_date) <= ? AND ";
    value.push(end_date);
  }
  if (status !== "All") {
    q = q + "status = ? AND ";
    value.push(status);
  }
  if (start_date !== "All") {
    q = q + "DATE(start_date) >= ? AND ";
    value.push(start_date);
  }
  if (lab !== "All") {
    q = q + "lab_name = ? AND ";
    value.push(lab);
  }
  if (labs.length > 0 && lab === "All") {
    q = q + "lab_name IN (?) AND ";
    value.push(labs);
  }

  q = q + "true;";

  db.query(q, value, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });

});

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
const getDays = () => {
  let days = [];
  const today = moment().format("YYYY-MM-DD");
  let sevenDaysAgo = moment().subtract(6, "days").format("YYYY-MM-DD");
  console.log(sevenDaysAgo);
  console.log(today);
  while (sevenDaysAgo <= today) {
    console.log(sevenDaysAgo);
    days.push(moment(sevenDaysAgo).format("YYYY-MM-DD"));
    sevenDaysAgo = moment(sevenDaysAgo).add(1, "days").format("YYYY-MM-DD");
    console.log(sevenDaysAgo);
  }
  return days;
}
const getDaysAfter = () => {
  let days = [];
  let today = moment().format("YYYY-MM-DD");
  let sevenDaysAfter = moment().add(6, "days").format("YYYY-MM-DD");
 
  while (sevenDaysAfter >= today) {
    
    days.push(moment(today).format("YYYY-MM-DD"));
    today = moment(today).add(1, "days").format("YYYY-MM-DD");
    
  }
  return days;
}

router.get("/numcheckouts/:labs", (req, res) => {
  const days = getDays();
  const labsParam = req.params.labs;
  let labs = labsParam ? labsParam.split(",") : [];
  const q =
    "select DATE(check_out_datetime) as date , count(*) as count from check_in_out_view where lab_name in (?) and check_out_datetime >= DATE_SUB( CURDATE() , INTERVAL 6 DAY) group by DATE(check_out_datetime) order by date asc;";
  db.query(q, [labs], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      
      let temp = []
     
      let formatedData = data.map((item) => {
        
        return {
          date: moment(item.date).format("YYYY-MM-DD"),
          count: item.count,
        };
      })
      
      temp = days.map((day) => {
        if (formatedData.find((item) => item.date === day)) {
          return formatedData.find((item) => item.date === day);
        } else {
          return { date: day, count: 0 };
        }
      })
    
      return res.json(temp);
    }
  });
});
router.get("/numcheckins/:labs", (req, res) => {
  const days = getDays();
  const labsParam = req.params.labs;
  let labs = labsParam ? labsParam.split(",") : [];
  const q =
    "select DATE(check_in_datetime) as date , count(check_in_datetime) as count from check_in_out_view where check_in_datetime >= DATE_SUB( CURDATE() , INTERVAL 6 DAY) and status = 'Checked-in' and lab_name in (?) group by DATE(check_in_datetime) order by date asc;";
  db.query(q, [labs], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      let temp = [];

      let formatedData = data.map((item) => {
        return {
          date: moment(item.date).format("YYYY-MM-DD"),
          count: item.count,
        };
      });

      temp = days.map((day) => {
        if (formatedData.find((item) => item.date === day)) {
          return formatedData.find((item) => item.date === day);
        } else {
          return { date: day, count: 0 };
        }
      });
      

      return res.json(temp);
    }
  });

});

router.get("/numreservations/:labs", (req, res) => {
  const days = getDaysAfter();
  const labsParam = req.params.labs;
  let labs = labsParam ? labsParam.split(",") : [];
  const q =
    "select DATE(start_date) as date , count(*) as count from reservation_view where start_date <= DATE_ADD( CURDATE() , INTERVAL 6 DAY)  and lab_name in (?) group by DATE(start_date) order by date asc;";
  db.query(q, [labs], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      let temp = [];

      let formatedData = data.map((item) => {
        return {
          date: moment(item.date).format("YYYY-MM-DD"),
          count: item.count,
        };
      });

      temp = days.map((day) => {
        if (formatedData.find((item) => item.date === day)) {
          return formatedData.find((item) => item.date === day);
        } else {
          return { date: day, count: 0 };
        }
      });
      console.log(temp);

      return res.json(temp);
    }
  });

});

router.get("/nummaintenances/:labs", (req, res) => {
  const days = getDaysAfter();
  const labsParam = req.params.labs;
  let labs = labsParam ? labsParam.split(",") : [];
  const q =
    "select DATE(start_date) as date , count(*) as count from maintenance_view where start_date <= DATE_ADD( CURDATE() , INTERVAL 6 DAY) and lab_name in (?) group by DATE(start_date) order by date asc;";
  db.query(q, [labs], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      let temp = [];

      let formatedData = data.map((item) => {
        return {
          date: moment(item.date).format("YYYY-MM-DD"),
          count: item.count,
        };
      });

      temp = days.map((day) => {
        if (formatedData.find((item) => item.date === day)) {
          return formatedData.find((item) => item.date === day);
        } else {
          return { date: day, count: 0 };
        }
      });
      console.log(temp);
      console.log("maintenance");

      return res.json(temp);
    }
  });
});



export default router;
