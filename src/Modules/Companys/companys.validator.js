import Joi from "joi";
import { sendResult, validatorOptions } from "../../Utils/helper";

const schema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'name is required'
    }),
    chiefName: Joi.string().required().messages({
        'any.required': 'chief name is required'
    }),
    chiefPhone: Joi.string().required().messages({
        'any.required': 'chief phone number is required'
    }),
    companyPhone: Joi.string().required().messages({
        'any.required': 'phone number is required'
    }),
    activity: Joi.string().required().messages({
        'any.required': 'activity is required'
    }),
    username: Joi.string().required().messages({
        'any.required': 'username is required'
    }),
    password: Joi.string().min(6).required().messages({
        'any.required': 'password phone number is required',
        'string.min': 'password lenght must be greather or equal than 6'
    }),
    confirmPwd: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.required': 'confirm password is required',
        'any.only': 'confim password is incorrect'
    })
});

const companysValidator = {
    validateSchema: (req, res, next) =>{
        const { error } = schema.validate(req.body, validatorOptions);
        if(error){
            sendResult(res, 400, `${error.details.map(err =>err.message).join(', ')}`)
        }else{ next() }
    }
};

export default companysValidator;