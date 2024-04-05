import mongoose from 'mongoose';
import { friendSchema } from './friend.schema.js';
import { customErrorHandler } from '../../error-handler/customErrorHandler.js';

const friendModel = mongoose.model('Friend',friendSchema);

export class FriendRepository{

    async toggleFriendRequest(friendId,userId){
        try{
            const requestExists = await friendModel.findOne({
                sender : userId,
                recipient : friendId,
            });
            if(requestExists){
                if(requestExists.status == 'Pending'){
                    return {
                        success : false,
                        message : "Request is already sent."
                    }
                }else if(requestExists.status == 'Rejected'){
                        await friendModel.findByIdAndUpdate(requestExists._id,{
                        status : 'Pending'
                        })
                    return {
                        success : true,
                        message : "Request Sent Successfully"
                    }
                }else{
                    await friendModel.findByIdAndUpdate(requestExists._id,{
                        status : 'Rejected'
                        });
                    return {
                        success : true,
                        message : "Connection Removed"
                    }
                }
            }else{
                const newRequest = new friendModel();
                newRequest.sender = userId;
                newRequest.recipient = friendId;
                newRequest.status = 'Pending'
                await newRequest.save();
                return{
                    success : true,
                    message : newRequest
                }
            }
        }catch(err){
            if(err instanceof customErrorHandler){
                throw new customErrorHandler(err.message,err.code);
            }

            throw new Error(err);
        }
    }

    async getFriends(userId){
        try{
            let friendList = await friendModel.find({
                $or : [
                    {sender : userId},
                    {recipient : userId}
                ],
                status : 'Accepted'                
            }).populate({
                path : 'recipient',
                select : 'name'
            });
            if(friendList.length > 0){
                friendList = friendList.map(flItem => flItem.recipient);
            }
            return {
                success : true,
                res : friendList
            }
        }catch(err){
            if (err instanceof customErrorHandler)
            {
                throw new customErrorHandler(err.message,err.code);
            }

            throw new Error(err);
        }
    }

    async getPendingRequests(userId){
        try{
            const pendingRequests = await friendModel.find({
                $or : [
                    {sender : userId},
                    {recipient : userId}
                ],
                status : 'Pending'          
            })
            .populate({
                path : 'sender',
                select : 'name'
            })
            .populate({
                path : 'recipient',
                select : 'name'
            });
            return {
                success : true,
                res : pendingRequests
            }
        }catch(err){
            if(err instanceof customErrorHandler){
                throw new customErrorHandler(err.message,err.code);
            }

            throw new Error(err);
        }
    }

    async responseToRequest(friendId,userId,action){
        try{
            const validRequest = await friendModel.findOne({
                sender : friendId,
                recipient : userId
            });
            if(validRequest){
                if(action != 'accept' && action != 'reject')
                {
                    throw new customErrorHandler("action can be having only 2 values accept or reject",400);
                }else{
                    if (action == 'accept')
                    {
                        await friendModel.findByIdAndUpdate(validRequest._id,{
                            status : "Accepted"
                        })    
                    }else{
                        await friendModel.findByIdAndUpdate(validRequest._id,{
                            status : "Rejected"
                        })    
                    }
                    
                    return {
                        success : true,
                        message : `Request ${action}ed`
                    }
                }
            }
        }catch(err){
            if(err instanceof customErrorHandler){
                throw new customErrorHandler(err.message,err.code);
            }
            throw new Error(err);
        }
    }
}