import { Router } from "express";
import { getAllBuyers, getOneBuyer, registerBuyer, signInBuyer, UpdateOneBuyer } from "../controller/buyerController";
import multer from "multer";
const upload = multer().single("image")

const buyerRouter = Router();

buyerRouter.route("/register-buyer").post(registerBuyer)
buyerRouter.route("/sign-in-buyer").post(signInBuyer)
buyerRouter.route("/get-all-buyer").get(getAllBuyers)
buyerRouter.route("/:buyerID/get-one-buyer").get(getOneBuyer)
buyerRouter.route("/:buyerID/update-buyer").patch(upload,UpdateOneBuyer)


export default buyerRouter