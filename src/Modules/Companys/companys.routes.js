import express from 'express';
import { verifyToken } from '../../Utils/auth.utils';
import companysController from './companys.controller';
import companysValidator from './companys.validator';
const companysRouter = express.Router();

companysRouter.post('/', companysValidator.validateSchema, companysValidator.validateCredSchema,  companysValidator.checkNameExist, companysValidator.checkUsernameExist, companysValidator.checkPhoneExist, companysValidator.checkEmailExist, companysController.create)
                .get('/', companysController.getAll)
                .get('/:id', companysController.getById)
                .put('/:id', companysValidator.checkUpdateNameExist, companysValidator.checkUpdatePhoneExist, companysValidator.checkUpdateEmailExist, companysController.update)
                .delete('/:id', companysController.delete)
                .post('/:companyId/credentials', companysValidator.validateCredSchema, companysValidator.checkUsernameExist, companysController.createCredentials)
                .post('/signin', companysValidator.validateLoginSchema, companysController.signin)
                .get('/auth/current', verifyToken, companysController.getCurrent)

export default companysRouter;