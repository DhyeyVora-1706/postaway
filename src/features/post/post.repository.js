import mongoose from "mongoose"
import { PostSchema } from "./post.schema.js"
import { customErrorHandler } from "../../error-handler/customErrorHandler.js";

const postModel = mongoose.model('Post',PostSchema)

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
            throw new customErrorHandler(err.message,500);
        }
    }

    async getOnePost(postId){
        try{
            const postDetails = await postModel.findById(postId).populate('userId');
            if(!postDetails){
                throw new customErrorHandler("Post Not Found",404);
            }
            return { success:true , postDetails };
        }catch(err){
            throw new customErrorHandler(err.message,500);
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
            throw new customErrorHandler(err.message,500);
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
            throw new customErrorHandler(err.message,500);
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
            throw new customErrorHandler(err.message,500);
        } 
    }

    async deletePost(postId,userId){
        try{
            const post = await postModel.findById(postId);
            if(!post){
                throw new customErrorHandler("Post Not Found",404);
            }

            if(post.userId == userId){
                await postModel.findByIdAndDelete(postId);
                return;
            }else{
                throw new customErrorHandler("User can only delete the post that they have created",400);
            }
        }catch(err){
            throw new customErrorHandler(err.message,500);
        }
    }
}
