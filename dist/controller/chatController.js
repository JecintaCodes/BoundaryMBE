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
const chatModel_1 = __importDefault(require("../model/chatModel"));
const mainError_1 = require("../error/mainError");
// export const createChat = async (req: Request, res: Response) => {
//   try {
//     const { userID, friendID } = req.params;
//     const friend: any = await userModel.findById(friendID);
//     const user: any = await userModel.findById(userID);
//     const checkUser = user.friends.some((el: string) => el === friendID);
//     const checkFriend = friend.friends.some((el: string) => el === userID);
//     if (checkUser && checkFriend) {
//       const chat = await chatModel.create({
//         member: [userID, friendID],
//       });
//       res.status(HTTP.CREATED).json({
//         message: "chat Established",
//         data: chat,
//       });
//     } else {
//       res.status(HTTP.BAD_REQUEST).json({
//         message: "Error",
//       });
//     }
//   } catch (error) {
//     res.status(HTTP.BAD_REQUEST).json({
//       message: "Error",
//     });
//   }
// };
// export const createChat = async (req: Request, res: Response) => {
//   try {
//     const { userID, buyerID, adminID } = req.params;
//     const user = await userModel.findById(userID);
//     const buyer = await buyerModel.findById(buyerID);
//     const admin = await adminModel.findById(adminID);
//     if (
//       (user && buyer) ||
//       (buyer && user) ||
//       (admin && user) ||
//       (user && admin) ||
//       (admin && buyer) ||
//       (buyer && admin)
//     ) {
//       const newChat = await chatModel.create({
//         member: [
//           userID,
//           buyerID || buyerID,
//           userID || adminID,
//           userID || userID,
//           adminID || buyerID,
//           adminID || adminID,
//           buyerID,
//         ],
//       });
//       return res.status(HTTP.CREATED).json({
//         message: `chat created`,
//         data: newChat,
//       });
//     } else {
//       return res.status(HTTP.BAD_REQUEST).json({
//         message: `you are not registered on this platform `,
//       });
//     }
//   } catch (error) {
//     return res.status(HTTP.BAD_REQUEST).json({
//       message: `can't create chat due to ${error} `,
//     });
//   }
// };
const createChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newChat = yield chatModel_1.default.create({
            member: [],
        });
        return res.status(201).json({
            message: `chat created`,
            data: newChat,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: `error creating chat`,
        });
    }
});
exports.createChat = createChat;
const getChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, adminID, buyerID } = req.params;
        const chat = yield chatModel_1.default.find({
            member: {
                $all: [userID || adminID || buyerID],
            },
        });
        res.status(mainError_1.HTTP.OK).json({
            message: "reading all chat",
            data: chat,
        });
    }
    catch (error) {
        res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "Error",
        });
    }
});
exports.getChat = getChat;
const getSpecificChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, adminID, buyerID } = req.params;
        const chat = yield chatModel_1.default.findOne({
            member: {
                $in: [
                    userID,
                    buyerID || buyerID,
                    userID || adminID,
                    userID || userID,
                    adminID || buyerID,
                    adminID || adminID,
                    buyerID,
                ],
            },
        });
        res.status(mainError_1.HTTP.OK).json({
            message: "chat signle Established",
            data: chat,
        });
    }
    catch (error) {
        res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "Error",
        });
    }
});
exports.getSpecificChat = getSpecificChat;
