import getDBConnection from "../db/db.ts";

export async function checkExistingInCart(userId: number, productId: number) {
    const db = await getDBConnection()

    return db.get('SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?',
        [userId, productId])
}

export async function updateCart(id: number, userId: number) {
    const db = await getDBConnection()

    return db.run('UPDATE cart_items SET quantity = quantity + 1 WHERE id = ? AND user_id = ?',
        [id, userId])
}

export async function insertIntoCart(userId: number, productId: number) {
    const db = await getDBConnection()

    return db.run('INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, 1)',
        [userId, productId])
}

export async function getCountFromCart(sessionId: number) {
    const db = await getDBConnection()

    return db.get(`SELECT SUM(quantity) AS totalItems FROM cart_items WHERE user_id = ?`,
        [sessionId])
}

export async function getAllFromCart(sessionId: number) {
    const db = await getDBConnection()

    return db.all(
        `SELECT id AS cartItemId, quantity, product_id AS productId 
         FROM cart_items 
         WHERE user_id = ?`,
        [sessionId]
    )
}

export async function selectCartItemQuantity(itemId: number, sessionId: number) {
    const db = await getDBConnection()

    return db.get('SELECT quantity FROM cart_items WHERE id = ? AND user_id = ?',
        [itemId, sessionId])
}

export async function deleteCartItemQuery(itemId: number, sessionId: number) {
    const db = await getDBConnection()

    return db.run('DELETE FROM cart_items WHERE id = ? AND user_id = ?',
        [itemId, sessionId])
}

export async function deleteAllFromCartQuery(sessionId: number) {
    const db = await getDBConnection()

    return db.run('DELETE FROM cart_items WHERE user_id = ?',
        [sessionId])
}