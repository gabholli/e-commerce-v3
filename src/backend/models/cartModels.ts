// import getDBConnection from "../db/db.ts";
import { ObjectId } from "mongodb"
import db from "../db/connect"

export async function checkExistingInCartQuery(userId: string, productId: number) {
    const collection = db.collection("cart")

    return collection.findOne({
        userId,
        productId
    })
}

export async function updateCartQuery(itemId: string, userId: string) {
    const collection = db.collection("cart")
    return collection.updateOne(
        {
            _id: new ObjectId(itemId),
            userId: userId
        },
        {
            $inc: { quantity: 1 }
        }
    )
}

export async function insertIntoCartQuery(
    userId: string,
    productId: number,
    title: string,
    price: number,
    image: string,
) {

    const collection = db.collection("cart")

    return collection.insertOne({
        userId,
        productId,
        title,
        price,
        image,
        quantity: 1
    })
}

export async function getTotalPriceFromCartQuery(userId: string) {
    const collection = db.collection("cart")

    const result = await collection.aggregate([
        { $match: { userId: userId } },
        {
            $group: {
                _id: null,
                totalPrice: {
                    $sum: { $multiply: ["$price", "$quantity"] }
                }
            }
        }
    ]).toArray()

    return result[0] || { totalPrice: 0 }
}

export async function getAllFromCartQuery(userId: string) {
    const collection = db.collection("cart")
    return collection
        .find({ userId })
        .toArray()
}

export async function selectCartItemQuantityQuery(itemId: string, userId: string) {
    const collection = db.collection("cart")

    return collection.findOne(
        {
            _id: new ObjectId(itemId),
            userId
        },
        {
            projection: { quantity: 1 }
        }
    )
}

export async function deleteCartItemQuery(itemId: string, userId: string) {
    const collection = db.collection("cart")

    return collection
        .deleteOne({
            _id: new ObjectId(itemId),
            userId
        })
}

export async function deleteAllFromCartQuery(userId: string) {
    const collection = db.collection("cart")

    return collection
        .deleteMany({ userId })
}