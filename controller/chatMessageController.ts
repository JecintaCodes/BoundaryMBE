import { Request, Response } from "express";
import chatModel from "../model/chatModel";
import userModel from "../model/userModel";
import chatMessageModel from "../model/chatMessageModel";
import { HTTP } from "../error/mainError";

export const createChatMesssage = async (req: Request, res: Response) => {
  try {
    const { userID, chatID } = req.params;
    const { message } = req.body;

    const chatMessage = await chatMessageModel.create({
      userID,
      chatID,
      message,
    });

    res.status(HTTP.CREATED).json({
      message: "Established chat message",
      data: chatMessage,
    });
  } catch (error) {
    res.status(HTTP.BAD_REQUEST).json({
      message: "Error",
    });
  }
};

export const getChatMessage = async (req: Request, res: Response) => {
  try {
    const { chatID } = req.params;

    const chatMessage = await chatMessageModel.find({ chatID });

    res.status(HTTP.OK).json({
      message: "Get chat message",
      data: chatMessage,
    });
  } catch (error) {
    res.status(HTTP.BAD_REQUEST).json({
      message: "Error",
    });
  }
};
