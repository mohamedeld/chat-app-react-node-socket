import express from "express";
import { getMessages, sentMessage } from "../controller/messageController";
import { protect } from "../controller/authController";
import { getUserForSidebar } from "../controller/userController";

const router = express.Router();

router.route("/").get(protect,getUserForSidebar)
export default router;