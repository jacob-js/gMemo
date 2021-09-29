import express from 'express';
import companysController from './companys.controller';
import companysValidator from './companys.validator';
const companysRouter = express.Router();

companysRouter.post('/', companysValidator.validateSchema, companysController.create);

export default companysRouter;