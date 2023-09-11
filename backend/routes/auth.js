import express from "express";
import db from "../dataBase/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const saltRounds = 10;
const router = express.Router();

router.post("/register", (req, res) => {
  const name = req.body.name;
  const user_name = req.body.user_name;
  const password = req.body.password;
  const email = req.body.email;
  const user_id = req.body.user_id;
  const phone_number = req.body.phone_number;
  const role = req.body.role;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) return res.json({ err: err });

    const q = "INSERT INTO user (user_id ,`name`, `role`,user_name, email, password, phone_number) VALUES (?,?,?,?,?,?,?);";
    db.query(q, [user_id,name,role, user_name, email, hash,phone_number], (err, data) => {
      if (err){
        console.log(err);
        return res.json({ status: "error", error: err });
      } 
      else {
        return res.json({ status: "ok" });
      };
    });
  });
});

router.post("/login", (req, res) => {
  const q = "SELECT * FROM user WHERE user_name = ?";
  db.query(q, [req.body.user_name], (err, data) => {
    if (err) {
      res.json({ err: err });
      console.log(err);
      console.log(data);
       // error in the database
    }

    if (data && data.length > 0) { 

      bcrypt.compare(
        req.body.password.toString(),
        data[0].password,
        (error, response) => {
          if (error) {
            res.json({ err: "Password compare error" });
          }
          if (response) {
            const role= data[0].role;
            const name = data[0].name;
            const user_id = data[0].user_id;
            const token = jwt.sign({ role , name, user_id }, "jwtSecret", {
              expiresIn: "1d",
            }); // create a token
            res.cookie("token", token); // store the token in the cookie
            res.json({ status: "ok" }); // If the password is correct,
          } else {
            res.json({ err: "Wrong password" }); // If the password is incorrect,
          }
        }
      );
    } else {
      res.json({ err: "User not found" });
    }
  });
});


const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ err: "There is no token" }); // therre is no token
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        return res.json({ err: "You are not authorized" }); // token is not valid
      } else {
        req.name = decoded.name;
        req.role = decoded.role;
        next(); // proceed to the next middleware or route handler
      }
    }); // verify the token
  }
};

router.get("/", verifyUser, (req, res) => {
  return res.json({ status: "ok", name: req.name, role: req.role });
});


router.get("/logout", (req, res) => {
  res.clearCookie("token"); // clear the cookie
  res.json({ status: "ok" });
});
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
router.get("/user", getUser,(req, res) => {// get the details of logged in user
     const user_id = req.user_id;
     const q = "SELECT user_id, name, role, user_name, email, phone_number FROM user WHERE user_id = ? ;";
     db.query(q, [user_id], (err, data) => {
       if (err) return res.json(err);
       else return res.json(data);
     });
    
});
router.get("/access", getUser,(req, res) => {// get he labs that the user has access to
    const user_id = req.user_id;
    const q = "SELECT name FROM lab JOIN access using(lab_id) where user_id = ?;";
    db.query(q, [user_id], (err, data) => {
      if (err) return res.json(err);
      else return res.json(data);
    });
});

router.get("/aaa", getUser, (req, res) => {
  const user_id = req.user_id;
  let list = [];
  const q = "SELECT name FROM lab JOIN access using(lab_id) where user_id = ?;";
  db.query(q, [user_id], (err, data) => {
    if (err) {return res.json(err)}
    else {
      data.forEach((element) => {
        list.push(element.name);
      });
      return res.json({list, role: req.role});
    };
  });
});


export default router;