export function sendResult(res, status, error, msg, data){
    res.status(status).json({ error: error, msg: msg, data: data })
};

export const validatorOptions = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
};