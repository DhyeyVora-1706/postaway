import { OTPRepository } from "./otp.repository.js";

export class OTPController{
    constructor(){
        this.otpRepository = new OTPRepository();
    }

    async sendOTP(req,res,next){
        try{
            const {email} = req.body;
            const response = await this.otpRepository.sendOTP(email);
            if(response.success){
                return res.status(200).json({
                    success : true,
                    message : response.res                    
                })
            }
        }catch(err){
            next(err);
        }
    }

    async verifyOTP(req,res,next){
        try{
            const { email , otp } = req.body;
            const response = await this.otpRepository.verifyOTP(email,otp);
            return res.status(200).json({
                success : response.success,
                message : response.res
            })
        }catch(err){
            next(err);
        }
    }

    async resetPassword(req,res,next){
        try{    
            const {newPassword , email} = req.body;
            await this.otpRepository.resetPassword(email , newPassword);
            return res.status(200).json({
                success : true,
                message : "Password Updated Successfully"
            });
        }catch(err){
            next(err);
        }
    }
}