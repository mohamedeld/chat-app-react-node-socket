import { NextFunction, Request, Response } from "express";
import asyncHandler from "../config/asyncHandler";
import AppError from "../config/appError";
import User from "../modals/userModal";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import { RequestWithUser } from "../types";

export const register = asyncHandler(async (req:Request,res:Response,next:NextFunction)=>{
    const {fullName,username,email,password,confirmPassword,gender} = req.body;

    if(password !== confirmPassword){
        return next(new AppError("Password and confirm password do not match",400))
    }
    const user = await User.findOne({email});
    if(user){
        return next(new AppError("User with this email is already exist",400))
    }
    const imgProfile = `https://cdn-icons-png.flaticon.com/512/6858/6858504.png`
    const newUser = await User.create({
        fullName,
        username,
        password,
        email,
        profilePic:imgProfile,
        gender
    })
    const token = newUser.generateToken();
    res.cookie("token",token,{
        expires:new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly:true,
        sameSite:'strict',
        secure:process.env.NODE_ENV === 'production'
    })
    res.status(201).json({
        status:"sucess",
        user:newUser,
        token
    })
})

export const login = asyncHandler(async (req:Request,res:Response,next:NextFunction)=>{
    const {email, password} = req?.body;
    if(!email || !password){
        return next(new AppError("Please provide email and password",400))
    }
    const user = await User.findOne({email});
    if(!user){
        return next(new AppError("User with this email does not exist",400))
    }
    const isMatch = await bcrypt.compare(password,user?.password);
    if(!isMatch){
        return next(new AppError("Invalid email or password",400))
    }
    const token = user?.generateToken();
    res.cookie("token",token,{
        expires:new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly:true,
        sameSite:'strict',
        secure:process.env.NODE_ENV === 'production'
    })
    res.status(200).json({
        status:"sucess",
        user,
        token
    })
})

export const protect = asyncHandler(async (req:Request, res:Response, next:NextFunction)=>{
    const request = req as RequestWithUser;
    let token;
    if(request.headers.authorization && request.headers.authorization.startsWith('Bearer')){
      token = request.headers.authorization.split(' ')[1];
    }
    if (!token) {
      throw new Error("access denied")
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    
    if (typeof decoded === "object" && "userId" in decoded) {
        const currentUser = await User.findById(decoded.userId);
    if(!currentUser){
      throw new Error(
        "the user that belong to this token does no longer exist"
      );
    }
 
    request.user = currentUser as any;
    next();
  }
});


export const logout = asyncHandler(async (req:Request,res:Response)=>{
    res.clearCookie("token");
    res.status(200).json({
        status:"sucess",
        message:"User logged out successfully"
    })
})