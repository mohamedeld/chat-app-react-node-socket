import mongoose from "mongoose"


const connectToDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.DB_URL as string);
        console.log(`Mongodb connectd to ${conn?.connection?.host}`)
    }catch(err){
        console.error(err);
        process.exit(1);
    }
}

export default connectToDB;