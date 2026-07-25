import { registerUser, loginUser, logoutUser, getMe } from '../controllers/authController.ts'
import express from 'express'

export const authRouter = express.Router()

authRouter.get("/me", getMe)
authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)
authRouter.get('/logout', logoutUser)

