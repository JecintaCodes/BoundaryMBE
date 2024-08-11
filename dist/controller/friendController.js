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
exports.unFriend = exports.beFriend = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const beFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, friendID } = req.params;
        const friend = yield userModel_1.default.findById(friendID);
        const user = yield userModel_1.default.findById(userID);
        if (user && friend) {
            friend.friends.push(userID);
            friend.save();
            user.friends.push(friendID);
            user.save();
        }
        res.status(201).json({
            message: "You are both Friends",
        });
    }
    catch (error) {
        res.status(404).json({
            message: "Error",
        });
    }
});
exports.beFriend = beFriend;
const unFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, friendID } = req.params;
        const friend = yield userModel_1.default.findById(friendID);
        const user = yield userModel_1.default.findById(userID);
        if (user && friend) {
            friend.friends.pull(userID);
            friend.save();
            user.friends.pull(friendID);
            user.save();
        }
        res.status(201).json({
            message: "You are both no more Friends",
        });
    }
    catch (error) {
        res.status(404).json({
            message: "Error",
        });
    }
});
exports.unFriend = unFriend;
