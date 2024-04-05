import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import { customErrorHandler } from "../../error-handler/customErrorHandler.js";
import bcrypt from 'bcrypt';

const userModel = mongoose.model('User',userSchema);

export class UserRepository{
    async signup(userObj){
        try{
            const newUser = new userModel(userObj);
            await newUser.save();
            return { success : true , res : newUser};
        }catch(err){
            
            if(err instanceof customErrorHandler){
                throw new customErrorHandler(err.message,err.code);
            }
            
            throw new Error(err.message);
        }
    }

    async signin(email,password){
        try{

            const user = await userModel.findOne({email : email});
            if(!user){
                throw new customErrorHandler("User Not Found",404);
            }else{
                const storedPassword = await bcrypt.compare(password,user.password);

                if(storedPassword){
                    return { success : true , res : user}
                }else{
                    throw new customErrorHandler("Invalid Credentials",400);
                }
            }
        }catch(err){
            
            if(err instanceof customErrorHandler){
                throw new customErrorHandler(err.message,err.code);
            }
            
            throw new Error(err.message);
        }
    }

    async getDetails(userId){
        try{
            const user = await userModel.findById(userId);
            if(!user){
                throw new customErrorHandler("User Not Found",404);
            }else{
                return user;
            }
        }catch(err){
            
            if(err instanceof customErrorHandler){
                throw new customErrorHandler(err.message,err.code);
            }
            
            throw new Error(err.message);
        }
    }

    async getAllUserDetails(){
        try{
            return await userModel.find({});
        }catch(err){
            
            if(err instanceof customErrorHandler){
                throw new customErrorHandler(err.message,err.code);
            }
            
            throw new Error(err.message);
        }
    }

    async updateUserDetails(newName,newEmail,newGender,userId){
        try{
            const updatedUserObject = {}
            if(newName){
                updatedUserObject.name = newName;
            }
            if(newEmail){
                updatedUserObject.email = newEmail;
            }

            if(newGender){
                updatedUserObject.gender = newGender;
            }
            console.log(updatedUserObject);
            return await userModel.findByIdAndUpdate(userId,updatedUserObject,{
                returnDocument : 'after'
            });
        }catch(err){
            
            if(err instanceof customErrorHandler){
                throw new customErrorHandler(err.message,err.code);
            }
            
            throw new Error(err.message);
        }
    }
}