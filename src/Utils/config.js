import dotenv from 'dotenv';
dotenv.config();

export const config = {
    dbUri: process.env.DB_URI
}