import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
import authRoutes from "./routes/authRoutes";
import messageRoutes from "./routes/messageRoutes"
import connectToDB from "./config/db";
import globalError from "./config/globalError";
import userRoutes from "./routes/userRoutes";

const PORT = process.env.PORT || 8080;

app.use(express.json())

app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);
app.use("/api/user",userRoutes)
app.use(globalError)

const server = app.listen(PORT,()=>{
    connectToDB();
    console.log(`Server is running on port ${PORT}`);
})



process.on('unhandledRejection',(err)=>{
    console.log('unhandleRejection',err);
    server.close(()=>{
        console.error("Server closed");
        process.exit(1);
    })
})
