import { MongoClient } from "mongodb";
import { config } from "../Utils/config";
import mongoose from 'mongoose';

// const client = new MongoClient(config.dbUri, { useNewUrlParser: true  });
mongoose.connect(config.dbUri, (err, res) =>{
    if(err){
        console.error(err);
        client.close()
    }else if(res){
        console.log('Mongo db connected');
    }
})
// client.connect((err, res) =>{
//     if(err){
//         console.error(err);
//         client.close()
//     }else if(res){
//         console.log('Mongo db connected');
//     }
// });