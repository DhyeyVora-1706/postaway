import mongoose from 'mongoose';

export const friendSchema = new mongoose.Schema({
    sender : {
        type:mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    recipient : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    status : {
        type : String,
        enum : ['Pending','Accepted','Rejected']
    }
})