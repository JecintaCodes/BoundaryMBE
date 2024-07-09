import { Router } from "express";
import { getAllUser, getOneUser, registerUser, signInUser } from "../controller/userController";


const userRouter = Router();

userRouter.route("/:adminID/register-user").post(registerUser)
userRouter.route("/sign-in-user").post(signInUser)
userRouter.route("/get-all-user").get(getAllUser)
userRouter.route("/:userID/get-one-user").get(getOneUser)

export default userRouter;