import { registerUser, loginUser, logoutUser } from '../controllers/authController.ts'
import express from 'express'
import type rateLimit from 'express-rate-limit'

export function createAuthRouter(authRateLimiter: ReturnType<typeof rateLimit>) {

    const authRouter = express.Router()

    authRouter.post('/register', authRateLimiter, registerUser)
    authRouter.post('/login', authRateLimiter, loginUser)
    authRouter.get('/logout', logoutUser)

    return authRouter
}
