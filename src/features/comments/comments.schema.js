import mongoose from "mongoose";

export const CommentsSchema = new mongoose.Schema({
    comment : {
        type : String,
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    postId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    }
})