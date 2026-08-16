import express from 'express'
import { webhookHandler } from '../controllers/webhookController.ts'

export const webhookRouter = express.Router()

webhookRouter.get('/', webhookHandler) 