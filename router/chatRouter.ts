import express, { Router } from "express";
import {
  createChat,
  getChat,
  getSpecificChat,
} from "../controller/chatController";

const router: Router = express.Router();

router.route("").post(createChat);

router.route("/:userID/get-chat").get(getChat);

router.route("/:userID/:friendID/get-a-chat").get(getSpecificChat);

export default router;
