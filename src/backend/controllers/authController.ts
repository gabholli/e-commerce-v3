// import validator from "validator"
// import { Request, Response } from "express"
// import getDBConnection from "../db/db"
// import bcrypt from "bcryptjs"
// import { error } from "console"

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

//         res.status(201).json({ message: "User registered" })

//     } catch (err) {
//         if (err instanceof Error) {
//             console.error("Registration error: ", err.message)
//             res.status(500).json({ error: "Registration failed. Please try again" })
//         }

//     }
// }

// export async function loginUser(req: Request, res: Response) {

//     let { email, password } = req.body

//     if (!email || !password) {
//         return res.status(400).json({ error: "All fields are required" })

//     }

//     email = email.trim()

//     try {

//         const db = await getDBConnection()

//         const user = await.db.get("SELECT * FROM users WHERE email = ?", [email])

//         if (!user) {
//             return res.status(401).json({ error: "Invalid credentials" })
//         }

//         const isvalid = await bcrypt.compare(password, user.password)

//         if (!isvalid) {

//             return res.status(401).json({ error: "Invalid credentials" })

//         }

//         req.sessions.userId = user.id

//         res.json({ message: "Logged in" })

//     } catch (err) {
//         if (err instanceof Error) {
//             console.error("Login error: ", err.message)
//             res.status(500).json({ error: "Login failed. Please try again" })
//         }
//     }
// }

// export async function logoutUser(req: Request, res: Response) {

//     req.session.destroy(() => {

//         res.json({ message: "Logged out" })
//     })
// }