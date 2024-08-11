"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const buyerController_1 = require("../controller/buyerController");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)().single("image");
const buyerRouter = (0, express_1.Router)();
buyerRouter.route("/register-buyer").post(buyerController_1.registerBuyer);
buyerRouter.route("/sign-in-buyer").post(buyerController_1.signInBuyer);
buyerRouter.route("/get-all-buyer").get(buyerController_1.getAllBuyers);
buyerRouter.route("/:buyerID/get-one-buyer").get(buyerController_1.getOneBuyer);
buyerRouter.route("/:buyerID/update-buyer").patch(upload, buyerController_1.UpdateOneBuyer);
exports.default = buyerRouter;
