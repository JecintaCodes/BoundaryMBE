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
exports.getOneBuyer = exports.UpdateOneBuyer = exports.getAllBuyers = exports.signInBuyer = exports.registerBuyer = void 0;
const role_1 = require("../utils/role");
const buyerModel_1 = __importDefault(require("../model/buyerModel"));
const bcryptjs_1 = require("bcryptjs");
const stream_1 = require("../utils/stream");
const registerBuyer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const salt = yield (0, bcryptjs_1.genSalt)(10);
        const harsh = yield (0, bcryptjs_1.hash)(password, salt);
        const buyer = yield buyerModel_1.default.create({
            name,
            email,
            password: harsh,
            role: role_1.role.buyer,
            verify: true,
        });
        return res.status(201).json({
            message: `welcome please sign in ${buyer === null || buyer === void 0 ? void 0 : buyer.name} `,
            data: buyer,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: `error signing in :${error}`,
        });
    }
});
exports.registerBuyer = registerBuyer;
const signInBuyer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const buyer = yield buyerModel_1.default.findOne({ email });
        console.log(buyer);
        if (buyer) {
            if (buyer === null || buyer === void 0 ? void 0 : buyer.verify) {
                const comp = yield (0, bcryptjs_1.compare)(password, buyer === null || buyer === void 0 ? void 0 : buyer.password);
                if (comp) {
                    return res.status(201).json({
                        message: `welcome ${buyer.name}`,
                        data: buyer,
                    });
                }
                else {
                    return res.status(404).json({
                        message: `In correct password`,
                    });
                }
            }
            else {
                return res.status(404).json({
                    message: `you are not verified as a buyer`,
                });
            }
        }
        else {
            return res.status(404).json({
                message: `please check your email`,
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: `error signing in :${error.message}`,
        });
    }
});
exports.signInBuyer = signInBuyer;
const getAllBuyers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const buyer = yield buyerModel_1.default.find();
        return res.status(200).json({
            message: "all buyers gotten",
            data: buyer,
            allBuyer: buyer === null || buyer === void 0 ? void 0 : buyer.length,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: `error signing in :${error}`,
        });
    }
});
exports.getAllBuyers = getAllBuyers;
const UpdateOneBuyer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { secure_url, public_id } = yield (0, stream_1.streamUpload)(req);
        const { buyerID } = req.params;
        const { name, details, image, imageID } = req.body;
        const buyer = yield buyerModel_1.default.findById(buyerID);
        if (buyer) {
            const update = yield buyerModel_1.default
                .findByIdAndUpdate(buyerID, {
                name,
                details,
                image: secure_url,
                imageID: public_id,
            })
                .sort({
                cretedAt: -1,
            });
            return res.status(201).json({
                message: " buyer updated",
                data: update,
            });
        }
        else {
            return res.status(404).json({
                message: `you are not a buyer `,
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: `can't get one buyer ${error} `,
        });
    }
});
exports.UpdateOneBuyer = UpdateOneBuyer;
const getOneBuyer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { buyerID } = req.params;
        const buyer = yield buyerModel_1.default.findById(buyerID).sort({
            cretedAt: -1,
        });
        return res.status(200).json({
            message: "one buyer gotten",
            data: buyer,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: `can't get one buyer ${error} `,
        });
    }
});
exports.getOneBuyer = getOneBuyer;
