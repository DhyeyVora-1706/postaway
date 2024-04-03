import mongoose from "mongoose";
import { PostSchema } from "./post.schema.js";
import { PostRepository } from "./post.repository.js";


export class PostController{

    constructor(){
        this.postRepository = new PostRepository();
    }

    async createPost(req,res,next){
        try{
            const newPost = {
                caption : req.body.caption,
                imageUrl : req.file.filename,
                userId : req.userId
            };
            const post = await this.postRepository.createPost(newPost);
            if(post){
                return res.status(201).json({
                    success : post.success,
                    postdata : post.res
                });
            }
        }catch(err){
            next(err);
        }
    }

    async getOnePost(req,res,next){
        try{
            const postId = req.params.postId;
            const post = await this.postRepository.getOnePost(postId);
            if(post.success){
                return res.status(200).json({
                    success : post.success,
                    postdata : post.postDetails
                })
            }
        }catch(err){
            next(err);
        }
    }

    async getUserPosts(req,res,next){
        try{
            const userPosts = await this.postRepository.getUserPosts(req.userId);
            if(userPosts.success){
                return res.status(200).json({
                    success : userPosts.success,
                    postData : userPosts.res                   
                });
            }
        }catch(err){
            next(err);
        }
    }

    async getAllPosts(req,res,next){
        try{        
            const postsData = await this.postRepository.getAllPosts();
            if(postsData.success){
                return res.status(200).json({
                    success : postsData.success,
                    posts : postsData.res
                })
            }
        }catch(err){
            next(err);
        }
    }
    
    async updatePost(req,res,next){
        try{
            const { caption } = req.body;
            const imageUrl = req.file.filename;
            const updatedPostDetails = await this.postRepository.updatePost(req.params.postId,caption,imageUrl,req.userId);
            if(updatedPostDetails.success){
                return res.status(200).json({
                    success : updatedPostDetails.success,
                    postData : updatedPostDetails.res
                })
            }
        }catch(err){
            next(err);
        }
    }

    async deletePost(req,res,next){
        try{
            await this.postRepository.deletePost(req.params.postId,req.userId);
            return res.status(200).json({
                success : true,
                message : "Post Deleted Successfully"
            });
        }catch(err){
            next(err);
        }
    }
}