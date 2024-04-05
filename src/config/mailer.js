import nodemailer from 'nodemailer';

export async function sendMail(email,otp){

    const transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user: process.env.AUTH_EMAIL,
            pass : process.env.AUTH_PASS
        }
    });
    
    
    const mailOptions = {
        from : process.env.AUTH_EMAIL,
        to:email,
        subject : 'PostAway Reset Password',
        text : `OTP for resetting password is ${otp}`
    }

    try{
        const result = await transporter.sendMail(mailOptions);
    }catch(err){
        throw new Error('Error in Sending Email '+err);
    }

}


