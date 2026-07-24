// import validator from "validator"
// import { Request, Response } from "express"
// import getDBConnection from "../db/db"
// import bcrypt from "bcryptjs"

// export async function registerUser(req: Request, res: Response) {

//     let { email, password } = req.body

//     if (!email || !password) {

//         return res.status(400).json({ error: "All fields are required" })


//     }

//     email = email.trim()
//     password = password.trim()

//     if (!validator.isEmail(email)) {

//         return res.status(400).json({ error: "Invalid email format" })
//     }

//     try {

//         const db = await getDBConnection()

//         const existing = await db.get("SELECT id FROM users WHERE email = ?",
//             [email]
//         )

//         if (existing) {
//             return res.status(400).json({ error: "Email already in use" })
//         }

//         const hashed = await bcrypt.hash(password, 10)

//         const result = await db.run('INSERT INTO users (email, password) VALUES (?, ?)',
//             [email, hashed])

//         req.session.userId = result.lastID

//         res.status(500).json({ error: "Registration failed. Please try again" })
//     }
// }