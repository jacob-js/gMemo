import { Router } from "express";
import { verifyToken } from "../../Utils/auth.utils";
import guestsController from "./guests.controller";
import guestValidator from "./guests.validator";

const guestsRouter = Router();
guestsRouter.post('/', verifyToken, guestValidator.validateSchema, guestsController.create)
            .get('/', verifyToken, guestsController.get)
            .get('/company/:companyId', verifyToken, guestsController.getByCompany)
            .get('/:id', guestsController.getById)
            .put('/:id', verifyToken, guestsController.update)
            .delete('/:id', verifyToken, guestsController.delete)
            .post('/insert', verifyToken, guestValidator.validateInsert, guestsController.insert)

export default guestsRouter;