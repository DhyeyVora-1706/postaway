import { customErrorHandler } from "../error-handler/customErrorHandler.js";

export function checkOTPVerification(req,res,next)
{
    if(req.session.OTPSent && req.session.OTPVerified){
        next();
    }else{
        throw new customErrorHandler("OTP Steps are Remaining , Password can be reset only after OTP is verified",400);
    }
}