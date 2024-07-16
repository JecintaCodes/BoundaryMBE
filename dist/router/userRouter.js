"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)().single("image");
const userRouter = (0, express_1.Router)();
userRouter.route("/:adminID/register-user").post(userController_1.registerUser);
userRouter.route("/sign-in-user").post(userController_1.signInUser);
userRouter.route("/get-all-user").get(userController_1.getAllUser);
userRouter.route("/:userID/get-one-user").get(userController_1.getOneUser);
userRouter.route("/:userID/update-image").patch(upload, userController_1.updateUserImage);
userRouter.route("/:userID/update-name").patch(userController_1.updateUserName);
userRouter.route("/:userID/update-detail").patch(userController_1.updateUserDetail);
userRouter.route("/:userID/update-info").patch(upload, userController_1.updateUserInfo);
exports.default = userRouter;
