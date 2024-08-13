import { Request, Response } from "express";
import mongoose from "mongoose";
import userModel from "../model/userModel";
import chatModel from "../model/chatModel";
import buyerModel from "../model/buyerModel";
import adminModel from "../model/adminModel";
import { HTTP } from "../error/mainError";

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

export const createChat = async (req: Request, res: Response) => {
  try {
    const { userID, buyerID, adminID } = req.params;

    const user = await userModel.findById(userID);
    const buyer = await buyerModel.findById(buyerID);
    const admin = await adminModel.findById(adminID);

    if (
      (user && buyer) ||
      (buyer && user) ||
      (admin && user) ||
      (user && admin) ||
      (admin && buyer) ||
      (buyer && admin)
    ) {
      const newChat = await chatModel.create({
        member: [
          userID,
          buyerID || buyerID,
          userID || adminID,
          userID || userID,
          adminID || buyerID,
          adminID || adminID,
          buyerID,
        ],
      });

      return res.status(HTTP.CREATED).json({
        message: `chat created`,
        data: newChat,
      });
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: `you are not registered on this platform `,
      });
    }
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: `can't create chat due to ${error} `,
    });
  }
};

export const getChat = async (req: Request, res: Response) => {
  try {
    const { userID, adminID, buyerID } = req.params;

    const chat = await chatModel.find({
      member: {
        $all: [userID || adminID || buyerID],
      },
    });

    res.status(HTTP.OK).json({
      message: "reading all chat",
      data: chat,
    });
  } catch (error) {
    res.status(HTTP.BAD_REQUEST).json({
      message: "Error",
    });
  }
};

export const getSpecificChat = async (req: Request, res: Response) => {
  try {
    const { userID, adminID, buyerID } = req.params;

    const chat = await chatModel.findOne({
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

    res.status(HTTP.OK).json({
      message: "chat signle Established",
      data: chat,
    });
  } catch (error) {
    res.status(HTTP.BAD_REQUEST).json({
      message: "Error",
    });
  }
};
