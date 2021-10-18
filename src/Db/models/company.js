import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
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
    address: {
        type: String,
        required: true
    },
    city: { type: String, required: true },
    allowed: { type: Boolean, default: false },
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    }
});

export const Companys = mongoose.model('Companys', companySchema)