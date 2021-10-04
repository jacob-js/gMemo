import { Companys } from "../../Db/models/company"
import Credentials from "../../Db/models/credentials";
import { comparePwd, createToken, hashPwd } from "../../Utils/auth.utils";
import { sendResult } from "../../Utils/helper";

const companysController = {
    create: async(req, res) =>{
        try {
            const company = new Companys(req.body);
            if(company){
                await company.save();
                sendResult(res, 200, null, 'company created', company);
            }
        } catch (error) {
            sendResult(res, 500, 'Something went wrong');
            console.error(error);
        }
    },
    getAll: async(req, res) =>{
        const { offset, limit, sort } = req.query;
        try {
            const companys = await Companys.find().skip(offset && parseInt(offset)).limit(limit && parseInt(limit)).sort(sort);
            sendResult(res, 200, null, null, companys)
        } catch (error) {
            sendResult(res, 500, 'something went wrong');
            console.error(error);
        }
    },

    getById: async(req, res) =>{
        const { id } = req.params;
        try {
            const company = await Companys.findById(id);
            if(company){
                sendResult(res, 200, null, null, company)
            }else{
                sendResult(res, 404, 'company not found')
            }
        } catch (error) {
            sendResult(res, 500, 'something went wrong')
        }
    },

    update: async(req, res) =>{
        const { id } = req.params;
        try {
            const company = await Companys.findOneAndUpdate({ _id: id }, req.body);
            if(company){
                sendResult(res, 200, null, 'company data updated')
            }else{
                sendResult(res, 404, 'company not found')
            }
        } catch (error) {
            sendResult(res, 500, 'something went wrong')
        }
    },

    delete: async(req, res) =>{
        const { id } = req.params;
        try {
            const company = await Companys.findOneAndDelete({ _id: id });
            if(company){
                sendResult(res, 200, null, 'company deleted')
            }else{
                sendResult(res, 404, 'company not found')
            }
        } catch (error) {
            sendResult(res, 500, 'something went wrong')
        }
    },

    createCredentials: async(req, res) =>{
        const { companyId } = req.params;
        const { password, username } = req.body;
        try {
            const hash = hashPwd(password);
            const credentials = await Credentials.create({ password: hash, company: companyId, username });
            const token = createToken(credentials._id);
            if(credentials){
                sendResult(res, 200, null, 'credentials saved', { cred: credentials, token: token })
            }else{
                sendResult(res, 403, 'cannot save credentials')
            }
        } catch (error) {
            sendResult(res, 500, 'something went wrong')
            console.error(error);
        }
    },

    signin: async(req, res) =>{
        const { password, username } = req.body;
        try {
            const company = await Credentials.findOne({ username }).populate('company');
            if(company){
                const isMatch = comparePwd(password, company.password);
                if(isMatch){
                    const token = createToken(company._id);
                    sendResult(res, 200, null, null, { cred: company, token })
                }else{
                    sendResult(res, 400, "nom d'utilisateur ou mot de passe incorrect")
                }
            }else{
                sendResult(res, 400, "nom d'utilisateur ou mot de passe incorrect")
            }
        } catch (error) {
            sendResult(res, 500, 'something went wrong')
            console.error(error);
        }
    },

    getCurrent: async(req, res) =>{
        sendResult(res, 200, null, null, req.cred);
    }
};

export default companysController;