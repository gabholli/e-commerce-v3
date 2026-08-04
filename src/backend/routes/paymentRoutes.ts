import express from 'express'
import { makePayment } from '../controllers/paymentController.ts'

export const paymentRouter = express.Router()

paymentRouter.post('/', makePayment) 