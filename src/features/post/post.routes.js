import express from 'express';
import { PostController } from './post.controller.js';
import { upload } from '../../middlewares/fileupload.middleware.js';
import { validateToken } from '../../middlewares/jwt.middleware.js';

export const postRouter = express.Router();

const postController = new PostController();


postRouter.get('/all',(req,res,next) => {
    postController.getAllPosts(req,res,next);
})

postRouter.post('/', validateToken , upload.single('imageUrl') ,(req,res,next) => {
    postController.createPost(req,res,next);
})

postRouter.get('/:postId',(req,res,next) => {
    postController.getOnePost(req,res,next);
})

postRouter.get('/', validateToken , (req,res,next) =>   {
    postController.getUserPosts(req,res,next);
})

postRouter.put('/:postId', validateToken, upload.single('imageUrl') , (req,res,next) => {
    postController.updatePost(req,res,next);
})

postRouter.delete('/:postId' , validateToken , (req,res,next) =>{
    postController.deletePost(req,res,next);
})