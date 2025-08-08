import express from 'express'
import globalRoutes from './globalRoutes'
import { verifyRole, verifyToken } from '../../middleware/verifyToken'

const customerRoutes = express.Router()

customerRoutes.use(verifyToken)
customerRoutes.use(verifyRole('customer'))
customerRoutes.use(globalRoutes)

export default globalRoutes;