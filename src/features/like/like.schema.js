import mongoose from "mongoose";

export const LikeSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    likeable : {
        type : mongoose.Schema.Types.ObjectId,
        refPath : 'Types'
    },
    Types : {
        type : String,
        enum : ['Post','Comment']
    }
})