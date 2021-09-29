import mongoose from 'mongoose';

const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    chiefName: {
        type: String,
        required: true
    },
    chiefPhone: {
        type: String,
        required: true
    },
    companyPhone: {
        type: String,
        required: true
    },
    activity: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    }
});

export const Companys = mongoose.model('Companys', companySchema)