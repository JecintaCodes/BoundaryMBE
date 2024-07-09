import { Router } from "express";
import { getAllAdmin, getOneAdmin, registerAdmin, signInAdmin } from "../controller/adminController";

const adminRouter = Router();

adminRouter.route("/register-admin").post(registerAdmin)
adminRouter.route("/sign-in-admin").post(signInAdmin)
adminRouter.route("/get-all-admin").get(getAllAdmin)
adminRouter.route("/:adminID/get-one-admin").get(getOneAdmin)

export default adminRouter