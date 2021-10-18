import mongoose from 'mongoose';

const agentsSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Companys', required: true }
});

const Sites = mongoose.model('Agents', agentsSchema);
export default Sites;