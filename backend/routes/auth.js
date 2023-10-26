import express from "express";
import db from "../dataBase/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { fetchUserFromLabAccess, fetchUserListFromLabAccess, fetchUsrWithDb, getNameRoleWithDb, getVerifiedWithDb,  loginWithdb,  registerUsrWithDb } from '../src/auth-controller.js';


const saltRounds = 10;
const router = express.Router();

router.post("/register",registerUsrWithDb);

router.post("/login",loginWithdb);


router.post("/login/mobile",getVerifiedWithDb);




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

router.get("/", verifyUser,getNameRoleWithDb );


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

router.get("/user", getUser, fetchUsrWithDb);


router.get("/access", getUser,fetchUserFromLabAccess);

router.get("/aaa", getUser, fetchUserListFromLabAccess);


export default router;