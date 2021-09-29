import express from 'express';
import companysRouter from './Modules/Companys/companys.routes';
const router = express.Router();

router.use('/companys', companysRouter)

export default router;