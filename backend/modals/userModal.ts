import {Schema,model,models} from "mongoose"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    fullName:{
        type:String,
        required:[true,"Please provide your full name"]
    },
    username:{
        type:String,
        required:[true,"Please provide your username"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"Please provide your email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please provide your password"],
        minLength:[6,"Password must be at least 6 characters long"]
    },
    gender:{
        type:String,
        required:[true,"Please provide your gender"],
        enum:['Male','Female']
    },
    profilePic:{
        type:String,
        default:""
    }
},{timestamps:true});

userSchema.pre('save',async function(next){
    try{
        if(!this.isModified('password')){
            next();
        }
        this.password = await bcrypt.hash(this.password,10);
        next();
    }catch(error){
        next(error as Error);
    }
})

userSchema.methods.generateToken = function(){
    return jwt.sign({userId:this._id,email:this?.email},process.env.JWT_SECRET as string,{
        expiresIn:'30d'
    })
}
const User = models?.User || model("User",userSchema);

export default User;