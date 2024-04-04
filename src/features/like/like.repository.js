import mongoose from "mongoose";
import { LikeSchema } from "./like.schema.js";
import { PostSchema } from "../post/post.schema.js";
import { CommentsSchema } from "../comments/comments.schema.js";
import { customErrorHandler } from "../../error-handler/customErrorHandler.js";

const LikeModel = mongoose.model('Like',LikeSchema);
const postModel = mongoose.model('Post',PostSchema);
const commentsModel = mongoose.model('Comment',CommentsSchema);

export class LikeRepository {
    async toggleLike(id,type,userId){
        try{
            if(type != 'Comment' && type != 'Post'){
                throw new customErrorHandler("Invalid Request , Please check type whether it is correct or not.",400);
            }

            let validObject;
            if(type == 'Comment'){
                validObject = await commentsModel.findById(id);
            }else{
                validObject = await postModel.findById(id);
            }

            if(!validObject){
                throw new customErrorHandler(`${type} with given Id does not exist`,404);
            }

            const likeExists = await LikeModel.find({
                userId : userId,
                likeable : id,
                Types : type      
            });


            if(likeExists.length == 0){
                const newLike = {
                    userId : userId,
                    likeable : id,
                    Types : type
                };
                await new LikeModel(newLike).save();
            }else{  
                await LikeModel.findByIdAndDelete(likeExists[0]._id);
            }
            return {
                success : true,
                res : "Like Toggled"
            }
        }catch(err){
            if(err instanceof customErrorHandler){
                throw new customErrorHandler(err.message,err.code);
            }

            throw new Error(err.message);
        }
    }

    async getLikes(id){
        try{    
            const likeData = await LikeModel.find({
                likeable : id
            }).populate({
                path : 'userId',
                select : 'name email'
            })
            if(likeData){
                return {
                    success : true,
                    res : likeData
                }
            }
        }catch(err){
            if(err instanceof customErrorHandler){
                throw new customErrorHandler(err.message,err.code);
            }

            throw new Error(err.message);
        }
    }
}