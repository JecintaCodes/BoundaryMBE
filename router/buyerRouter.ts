import { Router } from "express";
import { getAllBuyers, getOneBuyer, registerBuyer, signInBuyer } from "../controller/buyerController";

const buyerRouter = Router();

buyerRouter.route("/register-buyer").post(registerBuyer)
buyerRouter.route("/sign-in-buyer").post(signInBuyer)
buyerRouter.route("/get-all-buyer").get(getAllBuyers)
buyerRouter.route("/:buyerID/get-one-buyer").get(getOneBuyer)


export default buyerRouter