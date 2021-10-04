import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from './config';
import { sendResult } from './helper';
import Credentials from '../Db/models/credentials';

export function createToken(id){
    return jwt.sign({ id: id }, config.pKey)
};

export function hashPwd(pwd){
    return bcrypt.hashSync(pwd, 10);
};

export function comparePwd(string, hash){
    return bcrypt.compareSync(string, hash)
};

export async function verifyToken(req, res, next){
    const token = req.headers['g-token'];
    jwt.verify(token, config.pKey, async(err, payload) =>{
        if(err){
            sendResult(res, 401, "Veuillez vous connecter");
        }else{
            const credential = await Credentials.findOne({ _id: payload.id }).populate('company');
            if(credential){
                req.cred = credential;
                next()
            }else{
                sendResult(res, 401, "Veuillez vous connecter")
            }
        }
    })
}