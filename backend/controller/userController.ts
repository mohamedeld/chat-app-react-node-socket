import { NextFunction, Request, Response } from "express"
import asyncHandler from "../config/asyncHandler"
import { RequestWithUser } from "../types"
import User from "../modals/userModal";

export const getUserForSidebar =  asyncHandler(async (req:Request,res:Response,next:NextFunction)=>{
    const request = req as RequestWithUser;
    const userId = request?.user?._id;

    const users = await User.find({
        _id:{$ne:userId}
    }).select("-password")
    
    res.status(200).json({
        status:'success',
        users
    })
})