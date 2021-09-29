import { Companys } from "../../Db/models/company"
import { sendResult } from "../../Utils/helper";

const companysController = {
    create: async(req, res) =>{
        try {
            const company = await Companys.create(req.body);
            if(company){
                sendResult(res, 200, null, 'company created', company);
            }
        } catch (error) {
            sendResult(res, 500, 'Something went wrong');
            console.error(error);
        }
    }
};

export default companysController;