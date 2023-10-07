import express from "express";
import { checkInLogic } from "../src/checkin-controller.js";

const checkinRouter = express.Router();

checkinRouter.post('/', checkInLogic);

  export default checkinRouter;