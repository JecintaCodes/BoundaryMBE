import { Router } from "express";
import { getAllAdmin, getOneAdmin, registerAdmin, signInAdmin, updateAdmin, updateAdminDetail, updateAdminInFo, updateAdminName } from "../controller/adminController";
import multer from "multer"

const upload = multer().single("image");
const adminRouter = Router();

adminRouter.route("/register-admin").post(registerAdmin)
adminRouter.route("/sign-in-admin").post(signInAdmin)
adminRouter.route("/get-all-admin").get(getAllAdmin)
adminRouter.route("/:adminID/get-one-admin").get(getOneAdmin)
adminRouter.route("/:adminID/admin-update-avatar").patch(upload,updateAdmin)
adminRouter.route("/:adminID/update-admin-name").patch(updateAdminName)
adminRouter.route("/:adminID/update-admin-detail").patch(updateAdminDetail)
adminRouter.route("/:adminID/update-admin-info").patch(upload,updateAdminInFo)

export default adminRouter