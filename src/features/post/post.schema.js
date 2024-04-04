import mongoose from "mongoose";

export const PostSchema = new mongoose.Schema({
    caption : {
        type:String
    },
    imageUrl : {
        type : String,
        required : [true,"Please Upload the image for the post"]
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
});