import mongoose from "mongoose";
const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    phonenumber: {
        type: String,
        required: true,
    },
    profileImg:{
        type:String,
        default:""
     },
    communities:
        [ { type:mongoose.Schema.Types.ObjectId,
            ref: "Community"
 } ],
    createdAt:{
         type:Date,
         default:Date.now
  }
    
},{timestamps:true}
);

const User=mongoose.model('User',userSchema);
export default User;