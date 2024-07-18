"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAdminInFo = exports.updateAdminDetail = exports.updateAdminName = exports.updateAdmin = exports.getOneAdmin = exports.getAllAdmin = exports.signInAdmin = exports.registerAdmin = void 0;
const adminModel_1 = __importDefault(require("../model/adminModel"));
const role_1 = require("../utils/role");
const bcryptjs_1 = require("bcryptjs");
const stream_1 = require("../utils/stream");
const registerAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, secretCode } = req.body;
        const secret = "AjegunleCore";
        if (secret === secretCode) {
            const salt = yield (0, bcryptjs_1.genSalt)(10);
            const harsh = yield (0, bcryptjs_1.hash)(password, salt);
            const admin = yield adminModel_1.default.create({
                name,
                email,
                password: harsh,
                secretCode: secret,
                role: role_1.role.admin,
                verify: true,
            });
            return res.status(201).json({
                message: "welcome please sign in",
                data: admin
            });
        }
        else {
            return res.status(400).json({
                message: "your secret code is inCorrect"
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: `error signing in :${error}`
        });
    }
});
exports.registerAdmin = registerAdmin;
const signInAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const admin = yield adminModel_1.default.findOne({ email });
        if (admin) {
            if (admin === null || admin === void 0 ? void 0 : admin.verify) {
                const comp = yield (0, bcryptjs_1.compare)(password, admin === null || admin === void 0 ? void 0 : admin.password);
                if (comp) {
                    return res.status(201).json({
                        message: `welcome ${admin.name}`,
                        data: admin._id
                    });
                }
                else {
                    return res.status(404).json({
                        message: `Incorrect Password `
                    });
                }
            }
            else {
                return res.status(404).json({
                    message: `you are not verified as an admin`
                });
            }
        }
        else {
            return res.status(404).json({
                message: `please register as an admin`
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: `error signing in :${error}`
        });
    }
});
exports.signInAdmin = signInAdmin;
const getAllAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield adminModel_1.default.find();
        return res.status(200).json({
            message: "all admin gotten",
            data: admin
        });
    }
    catch (error) {
        return res.status(404).json({
            message: `error signing in :${error}`
        });
    }
});
exports.getAllAdmin = getAllAdmin;
const getOneAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { adminID } = req.params;
        const admin = yield adminModel_1.default.findById(adminID);
        return res.status(200).json({
            message: "one admin gotten",
            data: admin
        });
    }
    catch (error) {
        return res.status(404).json({
            message: `error getting one in :${error}`
        });
    }
});
exports.getOneAdmin = getOneAdmin;
const updateAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { adminID } = req.params;
        const { secure_url, public_id } = (0, stream_1.streamUpload)(req);
        const adminUpdate = yield adminModel_1.default.findByIdAndUpdate(adminID, {
            image: secure_url,
            imageID: public_id,
        }, {
            new: true
        });
        return res.status(201).json({
            message: `${adminUpdate === null || adminUpdate === void 0 ? void 0 : adminUpdate.name} avatar updated `,
            data: adminUpdate
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "can't update admin avatar "
        });
    }
});
exports.updateAdmin = updateAdmin;
const updateAdminName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { adminID } = req.params;
        const { name } = req.body;
        const admin = yield adminModel_1.default.findByIdAndUpdate(adminID, {
            name,
        }, {
            new: true
        });
        return res.status(201).json({
            message: `${admin === null || admin === void 0 ? void 0 : admin.name} has updated her name `,
            data: admin
        });
    }
    catch (error) {
        return res.status(404).json({
            message: `error updating admin name ${error} `
        });
    }
});
exports.updateAdminName = updateAdminName;
const updateAdminDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { adminID } = req.params;
        const { detail } = req.body;
        const admin = yield adminModel_1.default.findByIdAndUpdate(adminID, {
            detail,
        }, {
            new: true
        });
        return res.status(201).json({
            message: `${admin === null || admin === void 0 ? void 0 : admin.name} has updated her name `,
            data: admin
        });
    }
    catch (error) {
        return res.status(404).json({
            message: `error updating admin name ${error} `
        });
    }
});
exports.updateAdminDetail = updateAdminDetail;
const updateAdminInFo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { adminID } = req.params;
        const { name, detail, image, imageID } = req.body;
        const { secure_url, public_id } = (0, stream_1.streamUpload)(req);
        const admin = yield adminModel_1.default.findByIdAndUpdate(adminID, {
            name,
            detail,
            image: secure_url,
            imageID: public_id,
        }, { new: true });
        return res.status(201).json({
            message: `${admin === null || admin === void 0 ? void 0 : admin.name} information updated `,
            data: admin
        });
    }
    catch (error) {
        return res.status(404).json({
            message: `error updating admin: ${error} `
        });
    }
});
exports.updateAdminInFo = updateAdminInFo;
