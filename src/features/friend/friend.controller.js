import { FriendRepository } from "./friend.repository.js";

export class FriendController {
    constructor(){
        this.friendRepository = new FriendRepository();
    }

    async toggleFriendRequest(req,res,next){
        try{
            const friendId = req.params.friendId;
            const friendRequest = await this.friendRepository.toggleFriendRequest(friendId,req.userId);
            return res.status(200).json({
                success : friendRequest.success,
                res : friendRequest.message
            });
        }catch(err){
            next(err);
        }
    }

    async getFriends(req,res,next){
        try{
            const friendsList = await this.friendRepository.getFriends(req.userId);
            if(friendsList.success){
                return res.status(200).json({
                  success : true,
                  list : friendsList.res  
                })
            }
        }catch(err){
            next(err);
        }
    }

    async getPendingRequests(req,res,next){
        try{    
            const pendingRequests = await this.friendRepository.getPendingRequests(req.userId);
            if(pendingRequests.success){
                return res.status(200).json({
                    success : pendingRequests.success,
                    Pending_Requests : pendingRequests.res
                })
            }
        }catch(err){
            next(err);
        }
    }

    async responseToRequest(req,res,next){
        try{
            const friendId = req.params.friendId;
            const action = req.body.action;
            const response = await this.friendRepository.responseToRequest(friendId,req.userId,action);
            if(response.success){
                return res.status(200).json({
                    success : response.success,
                    message : response.message
                })
            }
        }catch(err){    
            next(err);
        }
    }
}