import express from 'express'
import { getMe } from '../controllers/meController.ts'

export const meRouter = express.Router()

meRouter.get('/', getMe) 