import { LikeRepository } from "./like.repository.js";

export class LikeController{
    constructor(){
      this.likeRepository = new LikeRepository();  
    }

    async toggleLike(req,res,next){
        try{
            const response = await this.likeRepository.toggleLike(req.params.id, req.query.type ,req.userId);
            if(response.success){
                return res.status(200).json({
                    success : response.success,
                    message : response.res
                })
            }
        }catch(err){
            next(err);
        }
    }

    async getLikes(req,res,next){
        try{
            const response = await this.likeRepository.getLikes(req.params.id);
            if(response.success){
                return res.status(200).json({
                    success : true,
                    likedata : response.res
                })
            }
        }catch(err){
            next(err);
        }
    }
}