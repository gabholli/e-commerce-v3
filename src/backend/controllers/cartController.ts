import { type Request, type Response } from "express"
import { checkExistingInCartQuery, deleteAllFromCartQuery, deleteCartItemQuery, getAllFromCartQuery, getCountFromCartQuery, insertIntoCartQuery, selectCartItemQuantityQuery, updateCartQuery } from "../models/cartModels.ts"

export async function addToCart(req: Request, res: Response) {

    const productId = parseInt(req.body.productId, 10)

    if (isNaN(productId)) {
        return res.status(400).json({ error: 'Invalid product ID' })
    }

    const userId = req.session.userId

    if (typeof userId !== 'number') {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    const existing = await checkExistingInCartQuery(userId, productId)

    if (existing) {
        await updateCartQuery(existing.id, userId)
    } else {
        await insertIntoCartQuery(userId, productId)
    }

    res.json({ message: 'Added to cart' })

}

export async function getCartCount(req: Request, res: Response) {
    const userId = req.session.userId

    if (typeof userId !== 'number') {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    const result = await getCountFromCartQuery(userId)

    res.json({ totalItems: result.totalItems || 0 })
}

export async function getAll(req: Request, res: Response) {
    const userId = req.session.userId

    if (typeof userId !== 'number') {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    const items = await getAllFromCartQuery(userId)

    res.json({ items: items })
}

export async function deleteItem(req: Request, res: Response) {

    const rawItemId = req.params.itemId

    if (typeof rawItemId !== "string") {
        return res.status(400).json({ error: "Invalid item ID" })
    }

    const itemId = parseInt(rawItemId, 10)

    if (isNaN(itemId)) {
        return res.status(400).json({ error: 'Invalid item ID' })
    }

    const userId = req.session.userId

    if (typeof userId !== "number") {
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

    if (typeof userId !== "number") {
        return res.status(401).json({ error: "Unauthorized" })
    }

    await deleteAllFromCartQuery(userId)

    res.status(204).send()

}