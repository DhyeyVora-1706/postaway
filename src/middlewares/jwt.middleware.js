import jwt from 'jsonwebtoken';

export function validateToken(req,res,next){
    const token = req.headers['authorization'];

    if(!token){
        return res.status(401).json({success : false , message : "UnAuthorised"});
    }

    try{
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        req.userId = payload.userId;
    }catch(err){
        return res.status(401).json({success : false ,  message : "UnAuthorised"});
    }
    next();
}