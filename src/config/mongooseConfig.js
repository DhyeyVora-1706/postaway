import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const db_url = process.env.DB_URL;

export function connecttoMongoDB(){
mongoose.connect(db_url,{
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(function(){
    console.log('Connected to mongodb');
}).catch(err => {
    console.log(err);
})
}