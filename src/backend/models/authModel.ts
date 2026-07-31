import db from "../db/connect.ts";

export async function findUserByEmail(email: string) {
    const collection = db.collection("users")
    return collection.findOne({ email })
}

export async function findUserIdByEmail(email: string) {

    const collection = db.collection("users")
    return collection
        .findOne({ email })
}

export async function createUser(email: string, hashedPassword: string) {
    const collection = db.collection("users")
    return collection.updateOne(
        {
            email
        },
        {
            $set: {
                password: hashedPassword
            }
        },
        { upsert: true }
    )
}

