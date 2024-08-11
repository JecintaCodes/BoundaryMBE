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
exports.getSpecificChat = exports.getChat = exports.createChat = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const chatModel_1 = __importDefault(require("../model/chatModel"));
const createChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, friendID } = req.params;
        const friend = yield userModel_1.default.findById(friendID);
        const user = yield userModel_1.default.findById(userID);
        const checkUser = user.friends.some((el) => el === friendID);
        const checkFriend = friend.friends.some((el) => el === userID);
        if (checkUser && checkFriend) {
            const chat = yield chatModel_1.default.create({
                member: [userID, friendID],
            });
            res.status(201).json({
                message: "chat Established",
                data: chat,
            });
        }
        else {
            res.status(404).json({
                message: "Error",
            });
        }
    }
    catch (error) {
        res.status(404).json({
            message: "Error",
        });
    }
});
exports.createChat = createChat;
const getChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, friendID } = req.params;
        const chat = yield chatModel_1.default.find({
            member: {
                $all: [userID],
            },
        });
        res.status(201).json({
            message: "chat Established",
            data: chat,
        });
    }
    catch (error) {
        res.status(404).json({
            message: "Error",
        });
    }
});
exports.getChat = getChat;
const getSpecificChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, friendID } = req.params;
        const chat = yield chatModel_1.default.findOne({
            member: {
                $in: [userID, friendID],
            },
        });
        res.status(201).json({
            message: "chat signle Established",
            data: chat,
        });
    }
    catch (error) {
        res.status(404).json({
            message: "Error",
        });
    }
});
exports.getSpecificChat = getSpecificChat;
