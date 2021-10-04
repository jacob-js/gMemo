import mongoose from 'mongoose';

const guestSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
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
    target: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Companys'
    }
});

const Guests = mongoose.model('Guests', guestSchema);
export default Guests;