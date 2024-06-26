import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import { userRouter } from './src/features/user/user.routes.js';
import { customErrorHandler } from './src/error-handler/customErrorHandler.js';
import { connecttoMongoDB } from './src/config/mongooseCOnfig.js';
import { validateToken } from './src/middlewares/jwt.middleware.js';
import { postRouter } from './src/features/post/post.routes.js';
import { CommentsRouter } from './src/features/comments/comments.routes.js';
import { likeRouter } from './src/features/like/like.routes.js';
import { OTPRouter } from './src/features/otp/otp.routes.js';
import session from 'express-session';
import { friendRouter } from './src/features/friend/friend.routes.js';

const server = express();

server.use(bodyParser.json());
server.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

server.use('/api/users',userRouter);
server.use('/api/posts' , postRouter);
server.use('/api/comments', validateToken , CommentsRouter)
server.use('/api/likes', likeRouter);
server.use('/api/otp',OTPRouter);
server.use('/api/friends', validateToken ,friendRouter);

//Application Level Error handler
server.use((err,req,res,next) => {

    if(err instanceof customErrorHandler){
        return res.status(err.code).json({error : err.message});
    }

    //Internal Server Errors
    console.log(err);
    res.status(500).send('Something Went Wrong , Please try Later');
});

server.use((req,res) => {
    res.status(404).json({error : "Invalid API Call , Please verify URL"});
})

server.listen(4500,function(){
    console.log("Server is running on port 4500");
    connecttoMongoDB();
})