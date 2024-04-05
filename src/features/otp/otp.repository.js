import mongoose from "mongoose";
import { customErrorHandler } from "../../error-handler/customErrorHandler.js";
import { otpSchema } from "./otp.schema.js";
import { userSchema } from "../user/user.schema.js";
import otpgenerator from 'otp-generator';
import bcrypt from 'bcrypt';
import { sendMail } from "../../config/mailer.js";

const OTPModel = mongoose.model('Otp',otpSchema);
const UserModel = mongoose.model('User',userSchema);

export class OTPRepository{
    async sendOTP(email){
        try{
            const validEmail = await UserModel.find({
                email : email
            });

            if(validEmail.length == 0){
                throw new customErrorHandler("Email Not Found",404);
            }

            let otp = otpgenerator.generate(6, { upperCaseAlphabets: false, specialChars: false ,lowerCaseAlphabets:false });

            const hashedOTP = await bcrypt.hash(otp,12);

            const otpObject = new OTPModel({
                email : email,
                otp : hashedOTP
            });
            await new OTPModel(otpObject).save();
            await sendMail(email,otp);
            return {
                success : true,
                res : `Email Sent Successfully to ${email}`
            }
        }catch(err){
            if(err instanceof customErrorHandler){
                throw new customErrorHandler(err.message,err.code);
            }

            throw new Error(err.message);
        }
    }

    async verifyOTP(email,enteredOTP){
        try{

            if(!enteredOTP || !email){
                throw new customErrorHandler("Empty Fields are not allowed",400);
            }

            const validEmail = await OTPModel.findOne({
                email : email
            });


            if(!validEmail){
                throw new customErrorHandler("Email Not Found",404);
            }else{
                const result = await bcrypt.compare(enteredOTP,validEmail.otp);
                if(!result){
                    return {
                        success : false,
                        res : "InCorrect OTP"
                    }
                }else{

                    await OTPModel.deleteOne({
                        _id : validEmail._id
                    });

                    return{
                        success : true,
                        res : "OTP Verification Successful"
                    }                }
            }
        }catch(err){
            if(err instanceof customErrorHandler){
                throw new customErrorHandler(err.message,err.code);
            }

            throw new Error(err.message);
        }
    }

    async resetPassword(email,newPassword){
        try{
            const user = await UserModel.findOne({
                email : email
            })
            if(!user){
                throw new customErrorHandler("User Not Found",404);
            }else{
                const hashedpassword = await bcrypt.hash(newPassword,12);
                await UserModel.findByIdAndUpdate(user._id,{password : hashedpassword});
                return;
            }
        }catch(err){
            
            if(err instanceof customErrorHandler){
                throw new customErrorHandler(err.message,err.code);
            }
            
            throw new Error(err.message);
        }
    }
}