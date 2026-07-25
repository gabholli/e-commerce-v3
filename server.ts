import "dotenv/config"
import express from "express"
import cors from "cors"
import createTable from "./src/backend/createTable.ts"
import session from "express-session"
import { authRouter } from "./src/backend/routes/authRoutes.ts"

const app = express()

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://gabholli-e-commerce-site.netlify.app/"
    ],
    credentials: true
}))

const PORT = process.env.PORT || 3001

if (!process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET environment variable is not set!")
}

app.use(express.json())

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    }
}))

app.use((req, _res, next) => {
    console.log("Content-Type:", req.headers["content-type"])
    console.log("Body:", req.body)
    next()
})

app.use("/auth", authRouter)
// app.use("/cart", cartRouter)

app.use((_req, res) => {
    res.send("Server here for e-commerce site...")
})

createTable().then(() => {
    app.listen(PORT, () => console.log("Server connected..."))
})