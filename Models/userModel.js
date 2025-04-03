import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    cartData:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"foodModel",
        default:[]
    }],
   
},{ timestamps: true })

const userModel = mongoose.model("userModel",userSchema);
export default userModel;