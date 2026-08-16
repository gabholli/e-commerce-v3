import validator from "validator"
import type { Request, Response } from "express"
import bcrypt from "bcryptjs"
import { createUser, findUserByEmail, findUserIdByEmail } from "../models/authModel.ts"

export async function registerUser(req: Request, res: Response) {

    let { email, password } = req.body

    if (!email || !password) {

        return res.status(400).json({ error: "All fields are required" })


    }

    email = email.trim()
    password = password.trim()

    if (!validator.isEmail(email)) {

        return res.status(400).json({ error: "Invalid email format" })
    }

    if (password.length < 8) {
        return res.status(400).json({ error: "Password must be at least 8 characters" })
    }


    try {

        const existing = await findUserIdByEmail(email)

        if (existing) {
            return res.status(400).json({ error: "Email already in use" })
        }

        const hashed = await bcrypt.hash(password, 10)

        const result = await createUser(email, hashed)

        req.session.userId = result.upsertedId?.toString()

        res.status(201).json({ message: "User registered" })

    } catch (err) {
        if (err instanceof Error) {
            console.error("Registration error: ", err.message)
            res.status(500).json({ error: "Registration failed. Please try again" })
        }

    }
}

export async function loginUser(req: Request, res: Response) {

    let { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" })

    }

    email = email.trim()

    try {

        const user = await findUserByEmail(email)

        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" })
        }

        const isValid = await bcrypt.compare(password, user.password)

        if (!isValid) {

            return res.status(401).json({ error: "Invalid credentials" })

        }

        req.session.userId = user._id.toString()

        res.json({ message: "Logged in" })

    } catch (err) {
        if (err instanceof Error) {
            console.error("Login error: ", err.message)
            res.status(500).json({ error: "Login failed. Please try again" })
        }
    }
}

export async function logoutUser(req: Request, res: Response) {

    req.session.destroy(() => {

        res.json({ message: "Logged out" })
    })
}