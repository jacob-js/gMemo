import express from 'express';
import companysRouter from './Modules/Companys/companys.routes';
import guestsRouter from './Modules/Guests/guests.routes';
const router = express.Router();

router.use('/companys', companysRouter).use('/guests', guestsRouter);

export default router;