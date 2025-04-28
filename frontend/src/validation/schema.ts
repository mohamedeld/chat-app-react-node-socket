import { z } from "zod"


export const loginSchema = z.object({
    email:z.string({message:"Email is required"}).email({message:"Invalid email"}),
    password:z.string({message:"Password is required"}).min(6,{message:"Password must be at least 6 characters long"})
})


export const registerSchema = z.object({
    fullName:z.string({message:"Full name is required"}),
    username:z.string({message:"user name is required"}),
    email:z.string({message:"Email is required"}).email({message:"Invalid email"}),
    password:z.string({message:"Password is required"}).min(6,{message:"Password must be at least 6 characters long"}),
    gender:z.enum(['Male','Female'])
})