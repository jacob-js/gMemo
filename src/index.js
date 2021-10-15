import cors from 'cors'
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import './Db/connection';
import router from './Router';
dotenv.config();
const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(cors('*'))

const db = mongoose.connection;
db.on('error', (err) =>{
    console.log('Mongo error', err);
});

//router
app.use('/api/v1', router);

const port = process.env.PORT || 5000;
app.listen(port, () =>{
    console.log(`gMemo api is running on port ${port}`);
});