import express from 'express'
import {
    addToCart,
    getTotalPrice,
    getAll,
    deleteItem,
    deleteAll
} from '../controllers/cartController.ts'
import requireAuth from '../middleware/requireAuth.ts'

export const cartRouter = express.Router()

cartRouter.post('/add', requireAuth, addToCart)
cartRouter.get('/total-price', requireAuth, getTotalPrice)
cartRouter.get('/', requireAuth, getAll)
cartRouter.delete('/all', requireAuth, deleteAll)
cartRouter.delete('/:itemId', requireAuth, deleteItem) 