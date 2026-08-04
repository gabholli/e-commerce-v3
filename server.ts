import "dotenv/config"
import express from "express"
import cors from "cors"
import session from "express-session"
import { authRouter } from "./src/backend/routes/authRoutes.ts"
import { meRouter } from "./src/backend/routes/meRoutes.ts"
import { cartRouter } from "./src/backend/routes/cartRoutes.ts"
import { paymentRouter } from "./src/backend/routes/paymentRoutes.ts"
import MongoStore from "connect-mongo"

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

const mongoUri = process.env.ATLAS_URI

if (!mongoUri) {
    throw new Error("ATLAS_URI environment variable is not set")
}

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(session({
    store: MongoStore.create({
        mongoUrl: mongoUri
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
app.use("/payment", paymentRouter)

app.use((_req, res) => {
    res.send("Server here for e-commerce site...")
})

app.listen(PORT, () => console.log("Server connected..."))
