import express from "express";
import { checkOutLogic } from "../src/checkout-controller.js";

const checkoutRouter = express.Router();


checkoutRouter.post('/', checkOutLogic);


export default checkoutRouter;
