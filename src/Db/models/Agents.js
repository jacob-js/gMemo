import mongoose from 'mongoose';

const agentsSchema = new mongoose.Schema({
    fullname: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Companys', required: true },
    role: { type: String, required: true },
    site: { type: mongoose.Schema.Types.ObjectId, ref: 'Sites' }
});

const Sites = mongoose.model('Agents', agentsSchema);
export default Sites;