import { NextFunction, Request, Response } from "express";
import asyncHandler from "../config/asyncHandler";
import { RequestWithUser } from "../types";
import Conversation from "../modals/conversationModal";
import Message from "../modals/messageModal";
import AppError from "../config/appError";

export const sentMessage = asyncHandler(async (req: Request, res: Response) => {
  const request = req as RequestWithUser;

  const { message } = req.body;
  const { id: recieverId } = req.params;
  const senderId = request?.user?._id;
  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, recieverId] },
  });
  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, recieverId],
    });
  }
  const newMessage = new Message({
    senderId,
    recieverId,
    message,
  });

  conversation.messages.push(newMessage?._id);
  await Promise.all([newMessage.save(), conversation.save()])
  res.status(201).json({
    status: "success",
    newMessage,
  });
});

export const getMessages = asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const request = req as RequestWithUser;
    const {id : receiverId} = req?.params;
    const senderId = request?.user?._id;
    const conversation = await Conversation.findOne({
        participants:{$all:[senderId,receiverId]}
    })
    if(!conversation){
        return next(new AppError("No conversation found",404))
    }
    const messages = await Message.find({
        _id:{$in:conversation?.messages}
    })
    res.status(200).json({
        status:'success',
        messages
    })
})
