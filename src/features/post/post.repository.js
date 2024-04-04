import mongoose from "mongoose"
import { PostSchema } from "./post.schema.js"
import { customErrorHandler } from "../../error-handler/customErrorHandler.js";
import { CommentsSchema } from "../comments/comments.schema.js";

const postModel = mongoose.model('Post',PostSchema);
const commentsModel = mongoose.model('Comment',CommentsSchema)

export class PostRepository{

    async createPost(postdata){
        try{
            const newPost = new postModel(postdata);
            await newPost.save();
            return {
                success : true,
                res : newPost
            }
        }catch(err){
            
            if(err instanceof customErrorHandler){
                throw new customErrorHandler(err.message,err.code);
            }
            
            throw new Error(err.message);
        }
    }

    async getOnePost(postId){
        try{
            const postDetails = await postModel.findById(postId).populate({
                path : 'userId',
                select : 'name email'
                });
            if(!postDetails){
                throw new customErrorHandler("Post Not Found",404);
            }
            return { success:true , postDetails };
        }catch(err){
            
            if(err instanceof customErrorHandler){
                throw new customErrorHandler(err.message,err.code);
            }
            
            throw new Error(err.message);
        }
    }

    async getUserPosts(userId){
        try{
            const postsData = await postModel.find({
                userId : userId
            });
            if(postsData.length > 0)
            {
                return { success : true , res : postsData };
            }else{
                return { success : true , res : "No Posts Found for current user"}
            }
            
        }catch(err){
            
            if(err instanceof customErrorHandler){
                throw new customErrorHandler(err.message,err.code);
            }
            
            throw new Error(err.message);
        }
    }

    async getAllPosts(){
        try{
            const postsData = await postModel.find({}).populate('userId');
            return {
                success : true,
                res : postsData
            }
        }catch(err){
            
            if(err instanceof customErrorHandler){
                throw new customErrorHandler(err.message,err.code);
            }
            
            throw new Error(err.message);
        }
    }

    async updatePost(postId,caption,imageUrl,userId){
        try{
            const updatedPostData = {};
            if(caption){
                updatedPostData.caption = caption;
            }

            if(imageUrl){
                updatedPostData.imageUrl = imageUrl;
            }

            const validateUserPost = await postModel.findById(postId);
            if(validateUserPost)
            {
                if(validateUserPost.userId == userId){
                    const updatedPostDetails = await postModel.findByIdAndUpdate(postId,updatedPostData,{
                        returnDocument : 'after'
                    });
                    return {
                        success : true,
                        res : updatedPostDetails
                    }
                }else{
                    throw new customErrorHandler("User can only update the post that they have created",400);
                }
            }else{
                throw new customErrorHandler('Post Not Found',400);
            }
        }catch(err){
            
            if(err instanceof customErrorHandler){
                throw new customErrorHandler(err.message,err.code);
            }
            
            throw new Error(err.message);
        } 
    }

    async deletePost(postId,userId){

        const session = await mongoose.startSession();
        session.startTransaction();

        try{

            const post = await postModel.findById(postId).session(session);
            if(!post){
                throw new customErrorHandler("Post Not Found",404);
            }

            if(post.userId == userId){
                await commentsModel.deleteMany({
                    postId : postId
                }).session(session);
                await postModel.findByIdAndDelete(postId).session(session);
                await session.commitTransaction();
                session.endSession();
                return;
            }else{
                throw new customErrorHandler("User can only delete the post that they have created",400);
            }
        }catch(err){
           
            await session.abortTransaction();
            session.endSession();            

            if(err instanceof customErrorHandler){
                throw new customErrorHandler(err.message,err.code);
            }
            
            throw new Error(err.message);
        }
    }
}
