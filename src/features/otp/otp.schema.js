import mongoose from "mongoose";

export const otpSchema = new mongoose.Schema({
    email : {
        type : String,
        required : [true,"Email Id is required"]
    },
    otp : String
})