import { type Request, type Response } from "express"
import {
    checkExistingInCartQuery, deleteAllFromCartQuery, deleteCartItemQuery,
    getAllFromCartQuery, getTotalPriceFromCartQuery, insertIntoCartQuery,
    selectCartItemQuantityQuery, updateCartQuery
} from "../models/cartModels.ts"

export async function addToCart(req: Request, res: Response) {
    const productId = Number(req.body.productId)
    const { title, price, image } = req.body

    if (!productId) {
        return res.status(400).json({ error: 'Invalid product ID' })
    }

    const userId = req.session.userId

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    const existing = await checkExistingInCartQuery(userId, productId)

    if (existing) {
        await updateCartQuery(existing._id.toString(), userId)
    } else {
        await insertIntoCartQuery(userId, productId, title, price, image)
    }

    res.json({ message: 'Added to cart' })

}

export async function getTotalPrice(req: Request, res: Response) {
    const userId = req.session.userId

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    const result = await getTotalPriceFromCartQuery(userId)

    res.json({ totalPrice: result.totalPrice || 0 })
}

export async function getAll(req: Request, res: Response) {
    const userId = req.session.userId

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    const items = await getAllFromCartQuery(userId)

    res.json({ items: items })
}

export async function deleteItem(req: Request, res: Response) {

    const itemId = req.params.itemId as string

    if (!itemId) {
        return res.status(400).json({ error: 'Invalid item ID' })
    }

    const userId = req.session.userId

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" })
    }

    const item = await selectCartItemQuantityQuery(itemId, userId)

    if (!item) {
        return res.status(400).json({ error: 'Item not found' })
    }

    await deleteCartItemQuery(itemId, userId)

    res.status(204).send()

}

export async function deleteAll(req: Request, res: Response) {

    const userId = req.session.userId

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" })
    }

    await deleteAllFromCartQuery(userId)

    res.status(204).send()

}
