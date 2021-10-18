import mongoose from 'mongoose';

const guestSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    luggage: {
        type: String
    },
    phone: {
        type: String,
        required: true
    },
    address: { type: String },
    cardNum: { type: Number },
    target: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
    exitDate: { type: Date },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Companys'
    }
});

const Guests = mongoose.model('Guests', guestSchema);
export default Guests;