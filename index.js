import express from 'express';

const server = express();

server.listen(4500,function(){
    console.log("Server is running on port 4500");
})