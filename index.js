import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import { userRouter } from './src/features/user/user.routes.js';
import { customErrorHandler } from './src/error-handler/customErrorHandler.js';
import { connecttoMongoDB } from './src/config/mongooseCOnfig.js';
import { validateToken } from './src/middlewares/jwt.middleware.js';

const server = express();

server.use(bodyParser.json());

server.use('/api/users',userRouter);

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