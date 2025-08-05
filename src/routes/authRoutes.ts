import express from 'express'
import { login } from '../controller/authController'
import { validateRequest } from '../middleware/validateRequest'
import { authSchema } from '../utils/zodSchema'

const authRoutes = express.Router()

authRoutes.post('/auth/login', validateRequest(authSchema.omit({ name: true })), login)

export default authRoutes;