import express from 'express';
import { FriendController } from './friend.controller.js';

export const friendRouter = express.Router();
const friendController = new FriendController();

friendRouter.post("/toggle-friendship/:friendId",(req,res,next) => {
    friendController.toggleFriendRequest(req,res,next);
})

friendRouter.get("/get-friends",(req,res,next) => {
    friendController.getFriends(req,res,next);
});

friendRouter.get("/get-pending-requests",(req,res,next) => {
    friendController.getPendingRequests(req,res,next);
})

friendRouter.post("/response-to-request/:friendId",(req,res,next) => {
    friendController.responseToRequest(req,res,next);
})