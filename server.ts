import "dotenv/config"
import express from "express"
import cors from "cors"
import createTable from "./src/backend/createTable.ts"
import session from "express-session"
import memorystore from "memorystore"
import { authRouter } from "./src/backend/routes/authRoutes.ts"
import { meRouter } from "./src/backend/routes/meRoutes.ts"
import { cartRouter } from "./src/backend/routes/cartRoutes.ts"

const MemoryStore = memorystore(session)

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
    store: new MemoryStore({
        checkPeriod: 86400000
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'lax'
    }
}))

app.use("/auth/me", meRouter)
app.use("/auth", authRouter)
app.use("/cart", cartRouter)

app.use((_req, res) => {
    res.send("Server here for e-commerce site...")
})

createTable().then(() => {
    app.listen(PORT, () => console.log("Server connected..."))
}).catch((err) => {
    console.error("Failed to start server:", err)
})