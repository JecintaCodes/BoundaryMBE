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
exports.getChatMessage = exports.createChatMesssage = void 0;
const chatMessageModel_1 = __importDefault(require("../model/chatMessageModel"));
const mainError_1 = require("../error/mainError");
const createChatMesssage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, chatID } = req.params;
        const { message } = req.body;
        const chatMessage = yield chatMessageModel_1.default.create({
            userID,
            chatID,
            message,
        });
        res.status(mainError_1.HTTP.CREATED).json({
            message: "Established chat message",
            data: chatMessage,
        });
    }
    catch (error) {
        res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "Error",
        });
    }
});
exports.createChatMesssage = createChatMesssage;
const getChatMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chatID } = req.params;
        const chatMessage = yield chatMessageModel_1.default.find({ chatID });
        res.status(mainError_1.HTTP.OK).json({
            message: "Get chat message",
            data: chatMessage,
        });
    }
    catch (error) {
        res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "Error",
        });
    }
});
exports.getChatMessage = getChatMessage;
