import getDBConnection from "../db/db.ts";

export async function findUserByEmail(email: string) {
    const db = await getDBConnection()

    return db.get("SELECT * FROM users WHERE email = ?",
        [email])
}

export async function findUserIdByEmail(email: string) {
    const db = await getDBConnection()

    return db.get("SELECT id FROM users WHERE email = ?",
        [email])
}

export async function createUser(email: string, hashedPassword: string) {
    const db = await getDBConnection()

    return db.run('INSERT INTO users (email, password) VALUES (?, ?)',
        [email, hashedPassword])
}