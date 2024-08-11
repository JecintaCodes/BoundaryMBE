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
exports.updateUserInfo = exports.updateUserDetail = exports.updateUserName = exports.updateUserImage = exports.getOneUser = exports.getAllUser = exports.signInUser = exports.registerUser = void 0;
const adminModel_1 = __importDefault(require("../model/adminModel"));
const role_1 = require("../utils/role");
const bcryptjs_1 = require("bcryptjs");
const userModel_1 = __importDefault(require("../model/userModel"));
const stream_1 = require("../utils/stream");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { adminID } = req.params;
        const { name, email, password } = req.body;
        console.log("TEST");
        const admin = yield adminModel_1.default.findById(adminID);
        if (admin) {
            console.log(admin);
            const salt = yield (0, bcryptjs_1.genSalt)(10);
            const harsh = yield (0, bcryptjs_1.hash)(password, salt);
            const user = yield userModel_1.default.create({
                name,
                email,
                password: harsh,
                // secretCode:secret,
                role: role_1.role.user,
                verify: true,
            });
            console.log(user);
            return res.status(201).json({
                message: "welcome please sign in",
                data: user,
            });
        }
        else {
            return res.status(400).json({
                message: "you are not an admin",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: `error signing in :${error === null || error === void 0 ? void 0 : error.message}`,
        });
    }
});
exports.registerUser = registerUser;
// export const registerUser = async (req:Request, res:Response)=>{
//     try {
//         const {adminID} = req.params;
//         const {name, email, password} = req.body;
//         const admin = await adminModel.findById(adminID)
//         if (admin) {
//             console.log("reading:",admin)
//             const salt = await genSalt(30);
//             const harsh = await hash(password, salt)
//             const user = await userModel.create({
//                 name,
//                 email,
//                 password:harsh,
//                 verify:true,
//                 role:role.user
//             })
//             return res.status(201).json({
//                 message:`u have successfully created ${user?.name}`,
//                 data:user
//             })
//         } else {
//             return res.status(404).json({
//                 message:`you are not an admin `
//             })
//         }
//     } catch (error:any) {
//         return res.status(404).json({
//             message:`error registering user ${error}`
//         })
//     }
// }
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel_1.default.findOne({ email });
        if (user === null || user === void 0 ? void 0 : user.verify) {
            // console.log(user)
            const comp = yield (0, bcryptjs_1.compare)(password, user === null || user === void 0 ? void 0 : user.password);
            if (comp) {
                return res.status(201).json({
                    message: `welcome ${user.name}`,
                    data: user,
                });
            }
            else {
                return res.status(404).json({
                    message: `Incorrect Password`,
                });
            }
        }
        else {
            return res.status(404).json({
                message: `please register as a user`,
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: `error signing in :${error}`,
        });
    }
});
exports.signInUser = signInUser;
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.find();
        return res.status(200).json({
            message: "all user gotten",
            data: user,
            totalUse: user.length,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: `error signing in :${error}`,
        });
    }
});
exports.getAllUser = getAllUser;
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        return res.status(200).json({
            message: "one user gotten",
            data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: `error getting one in :${error}`,
        });
    }
});
exports.getOneUser = getOneUser;
const updateUserImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { secure_url, public_id } = (0, stream_1.streamUpload)(req);
        const user = yield userModel_1.default.findByIdAndUpdate(userID, {
            image: secure_url,
            imageID: public_id,
        }, { new: true });
        return res.status(201).json({
            message: `user avatar updated`,
            data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: `error updating admin image ${error} `,
        });
    }
});
exports.updateUserImage = updateUserImage;
const updateUserName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { name } = req.body;
        const user = yield userModel_1.default.findByIdAndUpdate(userID, {
            name,
        }, { new: true });
        return res.status(201).json({
            message: " name updated ",
            data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: `user name not updated ${error}`,
        });
    }
});
exports.updateUserName = updateUserName;
const updateUserDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { detail } = req.body;
        const user = yield userModel_1.default.findByIdAndUpdate(userID, {
            detail,
        }, { new: true });
        return res.status(201).json({
            message: "user detail updated ",
            data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: `error updating details: ${error}`,
        });
    }
});
exports.updateUserDetail = updateUserDetail;
const updateUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { name, detail } = req.body;
        const { secure_url, public_id } = (0, stream_1.streamUpload)(req);
        const user = yield userModel_1.default.findByIdAndUpdate(userID, {
            name,
            detail,
            image: secure_url,
            imageID: public_id,
        }, { new: true });
        return res.status(201).json({
            message: `user information updated`,
            data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: `error updating user info ${error} `,
        });
    }
});
exports.updateUserInfo = updateUserInfo;
