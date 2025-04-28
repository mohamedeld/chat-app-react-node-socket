import express from "express";
import { getMessages, sentMessage } from "../controller/messageController";
import { protect } from "../controller/authController";

const router = express.Router();

router.route("/:id").get(protect,getMessages)
router.route("/send/:id").post(protect,sentMessage)
export default router;