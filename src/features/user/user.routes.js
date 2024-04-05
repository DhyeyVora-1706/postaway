import express from 'express';
import { UserController } from './user.controller.js';
import { validateToken } from '../../middlewares/jwt.middleware.js';

export const userRouter = express.Router();
const userController = new UserController();

userRouter.post("/signup" , (req,res,next) => {
    userController.signup(req,res,next);
});

userRouter.post("/signin",(req,res,next) => {
    userController.signin(req,res,next);
})

userRouter.get("/get-details/:id",(req,res,next) => {
    userController.getDetails(req,res,next);
})

userRouter.get("/get-all-details",(req,res,next) => {
    userController.getAllUserDetails(req,res,next);
})

userRouter.put("/UpdateUser", validateToken ,(req,res,next) => {
    userController.updateDetails(req,res,next);
})