import { Router } from "express";
import { createOrder } from "../controller/orderController";


const orderRouter = Router();

orderRouter.route("/:buyerID/:storeID/create-order").post(createOrder)



export default orderRouter;