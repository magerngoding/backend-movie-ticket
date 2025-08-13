import express from 'express'
import globalRoutes from './globalRoutes'
import { verifyRole, verifyToken } from '../../middleware/verifyToken'
import walletRoutes from './walletRoutes';

const customerRoutes = express.Router()

customerRoutes.use(verifyToken);
customerRoutes.use(verifyRole('customer'));
customerRoutes.use(globalRoutes);
customerRoutes.use(walletRoutes);

export default customerRoutes;