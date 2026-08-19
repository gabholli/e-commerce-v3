import { registerUser, loginUser, logoutUser } from '../controllers/authController.ts'
import express from 'express'
import { authRateLimiter } from '../middleware/authRateLimited.ts'

export const authRouter = express.Router()

authRouter.post('/register', authRateLimiter, registerUser)
authRouter.post('/login', authRateLimiter, loginUser)
authRouter.get('/logout', logoutUser)