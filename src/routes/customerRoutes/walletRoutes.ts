import express from 'express'
import { getBalance, getTopUpHistory, topupBalance } from '../../controller/walletController'
import { validateRequest } from '../../middleware/validateRequest';
import { topupSchema } from '../../utils/zodSchema';

const walletRoutes = express.Router()

walletRoutes.get('/check-balance', getBalance);
walletRoutes.get('/topup-history', getTopUpHistory);
walletRoutes.post('/topup', validateRequest(topupSchema), topupBalance);

export default walletRoutes;