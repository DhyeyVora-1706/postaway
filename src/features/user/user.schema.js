import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required : [true,"email is required"]
    },
    email : {
        type : String,
        required : [true,"email is required"],
        unique:true,
        match: [/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,"Please Enter Valid Email"]
    },
    password : {
        type : String,
        required : [true,"Password is required"],
        password : {type : String , validate : {
            validator : function(value){
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(value);
            },
            message:"Password should be between 8 to 12 characters and should contain a special character"
        }},
    },
    gender : {
        type : String,
        enum : ['Male','Female']
    }
})