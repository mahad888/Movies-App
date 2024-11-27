import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { 
      url:String,
      public_id:{
      type: String,
    
      }
    },
    role: {
      type: String,
      enum: ["patient", "doctor"],
      default: "patient",
    },
    
    gender: { type: String, enum: ["male", "female", "other"] }
    
 
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;
