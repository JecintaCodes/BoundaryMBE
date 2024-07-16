"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controller/adminController");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)().single("image");
const adminRouter = (0, express_1.Router)();
adminRouter.route("/register-admin").post(adminController_1.registerAdmin);
adminRouter.route("/sign-in-admin").post(adminController_1.signInAdmin);
adminRouter.route("/get-all-admin").get(adminController_1.getAllAdmin);
adminRouter.route("/:adminID/get-one-admin").get(adminController_1.getOneAdmin);
adminRouter.route("/:adminID/admin-update-avatar").patch(upload, adminController_1.updateAdmin);
adminRouter.route("/:adminID/update-admin-name").patch(adminController_1.updateAdminName);
adminRouter.route("/:adminID/update-admin-detail").patch(adminController_1.updateAdminDetail);
adminRouter.route("/:adminID/update-admin-info").patch(upload, adminController_1.updateAdminInFo);
exports.default = adminRouter;
