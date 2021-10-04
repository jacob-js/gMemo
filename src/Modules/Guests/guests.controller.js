import Guests from "../../Db/models/guest"
import { sendResult } from "../../Utils/helper";

const guestsController = {
    create: async(req, res) =>{
        try {
            const guest = await Guests.create({ ...req.body, createdAt: new Date(), company: req.cred.company._id });
            sendResult(res, 201, null, "Visiteur enregistré", guest)
        } catch (error) {
            sendResult(res, 500, 'something went wrong')
        }
    },
    get: async(req, res) =>{
        const { offset, limit, sort } = req.query;
        try {
            const guests = await Guests.find().skip(offset && parseInt(offset)).limit(limit && parseInt(limit)).sort(sort).populate('company');
            sendResult(res, 200, null, null, guests)
        } catch (error) {
            sendResult(res, 500, 'something went wrong')
        }
    },

    getByCompany: async(req, res) =>{
        const { offset, limit, sort } = req.query;
        const {companyId} = req.params;
        try {
            const guests = await Guests.find({ company: companyId }).skip(offset && parseInt(offset)).limit(limit && parseInt(limit)).sort(sort).populate('company');
            sendResult(res, 200, null, null, guests)
        } catch (error) {
            sendResult(res, 500, 'something went wrong')
        }
    },

    getById: async(req, res) =>{
        try {
            const guest = await Guests.findById(req.params.id).populate('company');
            if(guest){
                sendResult(res, 200, null, null, guest)
            }else{
                sendResult(res, 404, 'Visiteur non trouvé')
            }
        } catch (error) {
            sendResult(res, 500, 'something went wrong')
        }
    },

    update: async(req, res) =>{
        try {
            const guest = await Guests.findOneAndUpdate({ _id: req.params.id }, req.body);
            if(guest){
                sendResult(res, 200, null, 'Modification enregistrée')
            }else{
                sendResult(res, 404, 'Visiteur non trouvé')
            }
        } catch (error) {
            sendResult(res, 500, 'something went wrong')
        }
    },

    delete: async(req, res) =>{
        try {
            await Guests.findOneAndDelete({ _id: req.params.id });
            sendResult(res, 200, null, 'Visiteur supprimé')
        } catch (error) {
            sendResult(res, 500, 'something went wrong')
        }
    },

    insert: async(req, res) =>{
        const { data } = req.body;
        try {
            await Guests.insertMany(data);
            sendResult(res, 200, null, "Données inserées")
        } catch (error) {
            sendResult(res, 500, 'something went wrong');
            console.error(error);
        }
    }
};

export default guestsController;