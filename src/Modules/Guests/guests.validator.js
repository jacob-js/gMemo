import Joi from "joi";
import { sendResult, validatorOptions } from "../../Utils/helper";

const schema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'le nom est obligatoire'
    }),
    firstName: Joi.string().required().messages({
        'any.required': 'le prenom est obligatoire'
    }),
    lastName: Joi.string().required().messages({
        'any.required': 'le nom de famille est obligatoire'
    }),
    phone: Joi.string().required().messages({
        'any.required': "le numéro de téléphone est obligatoire"
    }),
    age: Joi.number().required().messages({
        'any.required': "l'age est obligatoire"
    }),
    target: Joi.string().required().messages({
        'any.required': "le champ cible est obligatoire"
    })
});

const insertSchema = Joi.object({
    data: Joi.array().required().messages({
        'any.required': 'Les données sont obligatoires'
    })
})

const guestValidator = {
    validateSchema: (req, res, next) =>{
        const {error} = schema.validate(req.body, validatorOptions);
        if(error){
            sendResult(res, 400, `${error.details.map(err => err.message).join(', ')}`)
        }else{next()}
    },

    validateInsert: (req, res, next) =>{
        const {error} = insertSchema.validate(req.body, validatorOptions);
        if(error){
            sendResult(res, 400, `${error.details.map(err => err.message).join(', ')}`)
        }else{next()}
    },
};

export default guestValidator;