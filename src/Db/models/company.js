import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
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
        required: true,
        unique: true
    },
    activity: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false,
        unique: false
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    }
});

export const Companys = mongoose.model('Companys', companySchema)