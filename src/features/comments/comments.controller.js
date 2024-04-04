import { CommentsRepository } from "./comments.repository.js";
import { CommentsSchema } from "./comments.schema.js";

export class CommentsController{
    constructor(){
        this.commentsRepository = new CommentsRepository();
    }

    async postComment(req,res,next){
        try{
            let newComment = {};
            newComment.comment = req.body.comment;
            newComment.userId = req.userId;
            newComment.postId = req.params.postId;
            const addedComment = await this.commentsRepository.postComment(newComment);
            if(addedComment.success){
                return res.status(200).json({
                    success:addedComment.success,
                    comment : addedComment.res
                });
            }
        }catch(err){
            next(err);
        }
    }

    async getPostComments(req,res,next){
        try{
            const postId = req.params.postId;
            const commentsList = await this.commentsRepository.getPostComments(postId);
            if(commentsList.success){
                return res.status(200).json({
                    success : commentsList.success,
                    comments : commentsList.res
                })
            }
        }catch(err){
            next(err);
        }
    }

    async updateComment(req,res,next){
        try{
            const {comment} = req.body;
            const updatedComment = await this.commentsRepository.updateComment(req.params.commentId,req.userId,comment);
            if(updatedComment.success){
                return res.status(200).json({
                    success : updatedComment.success,
                    comment : updatedComment.res
                })
            }
        }catch(err){
            next(err);
        }
    }

    async deleteComment(req,res,next){
        try{
            const deletedComment = await this.commentsRepository.deleteComment(req.params.commentId,req.userId);
            if(deletedComment.success){
                return res.status(200).json({
                    success : deletedComment.success,
                    message : deletedComment.res
                });
            }
        }catch(err){
            next(err);
        }
    }
}