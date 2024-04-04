import express from 'express';
import { LikeController } from './like.controller.js';
import { validateToken } from '../../middlewares/jwt.middleware.js';

export const likeRouter = express.Router();
const likeController = new LikeController();

likeRouter.post('/toggle/:id', validateToken ,(req,res,next) => {
    likeController.toggleLike(req,res,next);
})

likeRouter.get('/:id',(req,res,next) => {
    likeController.getLikes(req,res,next);
})