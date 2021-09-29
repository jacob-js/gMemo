import { MongoClient } from "mongodb";
import { config } from "../Utils/config";

const client = new MongoClient(config.dbUri, { useNewUrlParser: true  });
client.connect((err, res) =>{
    if(err){
        console.error(err);
        client.close()
    }else if(res){
        console.log('Mongo db connected');
    }
});