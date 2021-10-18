import Joi from "joi";
import { Companys } from "../../Db/models/company";
import Credentials from "../../Db/models/credentials";
import { sendResult, validatorOptions } from "../../Utils/helper";

const schema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'le nom est obligatoire'
    }),
    city: Joi.string().required().messages({
        'any.required': 'Veuillez preciser la ville'
    }),
    phone: Joi.string().required().messages({
        'any.required': "Le numéro de téléphone est obligatoire"
    }),
    address: Joi.string().required().messages({
        'any.required': "l'adresse est obligatoire"
    })
});

const credSchema = Joi.object({
    username: Joi.string().required().messages({
        'any.required': "le nom d'utilisateur est obligatoire"
    }),
    password: Joi.string().min(6).required().messages({
        'any.required': "le mot de passe est obligatoire",
        'string.min': "le mot de passe doit contenir au minimum 6 caractères"
    }),
    confirmPwd: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.required': "confirmation mot de passe incorrect",
        'any.only': 'confirmation mot de passe incorrect'
    })
})

const loginSchema = Joi.object({
    username: Joi.string().required().messages({
        'any.required': "le nom d'utilisateur est obligatoire"
    }),
    password: Joi.string().required().messages({
        'any.required': "le mot de passe est obligatoire",
    }),
})

const companysValidator = {
    validateSchema: (req, res, next) =>{
        const { error } = schema.validate(req.body, validatorOptions);
        if(error){
            sendResult(res, 400, `${error.details.map(err =>err.message).join(', ')}`)
        }else{ next() }
    },

    checkNameExist: async(req, res, next) =>{
        try {
            const company = await Companys.findOne({ name: req.body.name });
            if(company){
                sendResult(res, 409, 'company name already exist')
            }else{
                next()
            }
        } catch (error) {
            console.error(error);
        }
    },

    checkUpdateNameExist: async(req, res, next) =>{
        const { id } = req.params;
        try {
            const company = await Companys.findOne({ name: req.body.name });
            if(company && company._id !== id){
                sendResult(res, 409, 'company name already exist')
            }else{
                next()
            }
        } catch (error) {
            console.error(error);
        }
    },

    checkUpdatePhoneExist: async(req, res, next) =>{
        const { id } = req.params;
        try {
            const company = await Companys.findOne({ companyPhone: req.body.companyPhone });
            if(company && company._id !== id){
                sendResult(res, 409, 'company phone already exist')
            }else{
                next()
            }
        } catch (error) {
            console.error(error);
        }
    },

    checkUpdateEmailExist: async(req, res, next) =>{
        const { id } = req.params;
        try {
            if(req.body.email){
                const company = await Companys.findOne({ email: req.body.email });
                if(company && company._id !== id){
                    sendResult(res, 409, 'company email already exist')
                }else{
                    next()
                }
            }else{next()}
        } catch (error) {
            console.error(error);
            sendResult(res, 500, error)
        }
    },

    checkPhoneExist: async(req, res, next) =>{
        try {
            const company = await Companys.findOne({ companyPhone: req.body.companyPhone });
            if(company){
                sendResult(res, 409, 'company phone already exist')
            }else{
                next()
            }
        } catch (error) {
            console.error(error);
        }
    },

    checkEmailExist: async(req, res, next) =>{
        try {
            if(req.body.email){
                const company = await Companys.findOne({ email: req.body.email });
                if(company){
                    sendResult(res, 409, "email de l'entreprise est déjà utilisé")
                }else{
                    next()
                }
            }else{next()}
        } catch (error) {
            console.error(error);
            sendResult(res, 500, error)
        }
    },

    validateCredSchema: (req, res, next) =>{
        const {error} = credSchema.validate(req.body, validatorOptions)
        if(error){
            sendResult(res, 400, `${error.details.map(e =>e.message).join(', ')}`)
        }else{next()}
    },

    checkUsernameExist: async(req, res, next) =>{
        const { username } = req.body;
        const credential = await Credentials.findOne({ username });
        if(credential){
            sendResult(res, 409, "ce nom d'utilisateur est en cours d'utilisation")
        }else{next()}
    },

    validateLoginSchema: async(req, res, next) =>{
        const {error} = loginSchema.validate(req.body, validatorOptions);
        if(error){
            sendResult(res, 400, `${error.details.map(e =>e.message).join(', ')}`)
        }else{ next() }
    }
};

export default companysValidator;