import express from 'express';
import { CommentsController } from './comments.controller.js';
import { validateToken } from '../../middlewares/jwt.middleware.js';

export const CommentsRouter = express.Router();

const commentsController = new CommentsController();

CommentsRouter.post('/:postId' , (req,res,next) => {
    commentsController.postComment(req,res,next);
})

CommentsRouter.get('/:postId',(req,res,next) => {
    commentsController.getPostComments(req,res,next);
})

CommentsRouter.put('/:commentId',(req,res,next) => {
    commentsController.updateComment(req,res,next);
})

CommentsRouter.delete('/:commentId',(req,res,next) => {
    commentsController.deleteComment(req,res,next);
})