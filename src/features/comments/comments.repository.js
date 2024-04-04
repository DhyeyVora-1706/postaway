import mongoose from "mongoose";
import { CommentsSchema } from "./comments.schema.js";
import { customErrorHandler } from "../../error-handler/customErrorHandler.js";
import { PostSchema } from "../post/post.schema.js";

const commentsModel = mongoose.model('Comment',CommentsSchema);
const postModel = mongoose.model('Post',PostSchema);

export class CommentsRepository{

    async postComment(comment){
        try{

            const validPost = await postModel.findById(comment.postId);
            if(!validPost){
                throw new customErrorHandler("Post Not Found",404);
            }

            const newComment = new commentsModel(comment);
            await newComment.save();
            return {
                success : true,
                res : newComment
            }
        }catch(err){
            
            if(err instanceof customErrorHandler){
                throw new customErrorHandler(err.message,err.code);
            }
            
            throw new Error(err.message);
        }
    }

    async getPostComments(postId){
        try{
            const validPost = await postModel.findById(postId);
            if(!validPost){
                throw new customErrorHandler("Post Not Found",404);
            }

            const commentsList = await commentsModel.find({
                postId:postId
            }).populate({
                path : 'userId',
                select : 'name email'
            })
            if(commentsList.length == 0)
            {
                return {
                    success : true,
                    res : "No Comments added to this post yet"
                }
            }else{
                return {
                    success : true,
                    res : commentsList
                }
            }
        }catch(err){
            
            if(err instanceof customErrorHandler){
                throw new customErrorHandler(err.message,err.code);
            }
            
            throw new Error(err.message);
        }
    }

    async updateComment(commentId,userId,modifiedComment){
        try{
            
            const validComment = await commentsModel.findById(commentId);
            if(!validComment){
                throw new customErrorHandler("Comment Not Found",404);
            }

            const comment = await commentsModel.findById(commentId);
            const postOwnerId = (await comment.populate('postId')).postId.userId;

            if(comment.userId == userId || postOwnerId == userId)
            {
                const updatedComment = await commentsModel.findByIdAndUpdate(commentId,{
                    comment : modifiedComment
                },
                {
                    returnDocument : 'after'
                });
                return {
                    success : true,
                    res : updatedComment
                }
            }else{
                throw new customErrorHandler("Only Post Owner or Commenter can update the comment",400);
            }
            
        }
        catch(err)
        {
            if(err instanceof customErrorHandler){
                throw new customErrorHandler(err.message,err.code);
            }
            
            throw new Error(err.message);
        }
    }

    async deleteComment(commentId,userId){
        try{
            const validComment = await commentsModel.findById(commentId);
            if(!validComment){
                throw new customErrorHandler("Comment Not Found",404);
            }

            const comment = await commentsModel.findById(commentId);
            const postOwnerId = (await comment.populate('postId')).postId.userId;

            if(comment.userId == userId || postOwnerId == userId)
            {
                await commentsModel.findByIdAndDelete(commentId);
                return {
                    success : true,
                    res : "Comment Deleted Successfully"
                }
            }else{
                throw new customErrorHandler("Only Post Owner or Commenter can delete the comment",400);
            }

            
        }catch(err){
            if(err instanceof customErrorHandler){
                throw new customErrorHandler(err.message,err.code);
            }

            throw new Error(err.message);
        }
    }
   
}