import bcrypt from "bcrypt";
import { UserRepository } from "./user.repository.js";
import jwt from 'jsonwebtoken';

export class UserController{

    constructor(){
        this.userRepository = new UserRepository();
    }

    async signup(req,res,next){
        try{
            const { name , email , password , gender} = req.body;
            const hasedPassword = await bcrypt.hash(password,12);
            const userObj = {
                name,
                email,
                password : hasedPassword,
                gender
            };
            const resp = await this.userRepository.signup(userObj);
                res.status(201).
                    json({
                        success : true,
                        msg : "User Registration Successful",
                        res : resp.res
                    });
        }catch(err){
            next(err);
        }
    }

    async signin(req,res,next){
        try{
            const {email , password } = req.body;
            const validcredentials = await this.userRepository.signin(email,password);
            if(validcredentials.success){
                const token = jwt.sign(
                    {
                        userId : validcredentials.res._id
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn : "1h"
                    }
                )

                return res.status(200).json({
                    success : true,
                    message : "Login Successful",
                    token
                });
            }
        }catch(err){
            next(err);
        }
    }

    async getDetails(req,res,next){
        try{
            const user = await this.userRepository.getDetails(req.params.id);
            return res.status(200).send({
                success : true,
                user
            });
        }catch(err){
            next(err);
        }
    }

    async getAllUserDetails(req,res,next){
        try{    
            const usersDetails = await this.userRepository.getAllUserDetails();
            return res.status(200).json({
                success : true,
                usersDetails
            });
        }catch(err){
            next(err);
        }
    }

    async updateDetails(req,res,next){
        try{
            const {email , gender , name} = req.body;
            const updatedDetails = await this.userRepository.updateUserDetails(name,email,gender,req.userId);
            return res.status(200).json({
                success : true,
                updatedDetails
            });
        }catch(err){
            next(err);
        }
    }
}