import { ObjectId } from "mongodb";
import  mongoose  from "mongoose";

const credentialsSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Companys'
    }
});
const Credentials = mongoose.model('Credentials', credentialsSchema);

export default Credentials;