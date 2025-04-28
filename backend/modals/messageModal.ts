import {Schema,model,models} from "mongoose"

const messageSchema = new Schema({
    senderId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:[true,"Please provide sender id"]
    },
    recieverId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:[true,"Please provide receiver id"]
    },
    message:{
        type:String,
        required:[true,"Please provide your message"]
    },
},{timestamps:true});


const Message = models?.Message || model("Message",messageSchema);

export default Message;