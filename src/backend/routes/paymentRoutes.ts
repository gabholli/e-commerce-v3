import express from 'express'
import { makePayment } from '../controllers/paymentController'

export const paymentRouter = express.Router()

paymentRouter.post('/', makePayment) 