import db from "../db/connect.ts";

export async function findUserByEmail(email: string) {
    let collection = db.collection("users")
    return collection.findOne({ email })
}

export async function findUserIdByEmail(email: string) {

    return db.get("SELECT id FROM users WHERE email = ?",
        [email])
}

export async function createUser(email: string, hashedPassword: string) {

    return db.run('INSERT INTO users (email, password) VALUES (?, ?)',
        [email, hashedPassword])
}