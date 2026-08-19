import "dotenv/config"
import express from "express"
import cors from "cors"
import session from "express-session"
import { meRouter } from "./src/backend/routes/meRoutes.ts"
import { cartRouter } from "./src/backend/routes/cartRoutes.ts"
import { paymentRouter } from "./src/backend/routes/paymentRoutes.ts"
import { webhookRouter } from "./src/backend/routes/webhookRoutes.ts"
import MongoStore from "connect-mongo"
import RateLimitMongo from "rate-limit-mongo"
import rateLimit from "express-rate-limit"
import { createAuthRouter } from "./src/backend/routes/authRoutes.ts"


const app = express()
app.set("trust proxy", 1)

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://gabholli-e-commerce-site.netlify.app"
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

const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
        const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown'
        console.log("Rate limit key:", ip)  // 🔍
        return ip as string
    },
    message: { error: "Too many attempts, please try again in 15 minutes" },
    handler: (req, res) => {
        console.log(`Rate limit hit for IP: ${req.ip}`)  // 🔍
        res.status(429).json({ error: "Too many attempts, please try again in 15 minutes" })
    },
    store: new RateLimitMongo({
        uri: mongoUri,
        collectionName: "rateLimits",
        expireTimeMs: 15 * 60 * 1000
    })
})

app.use("/webhook", express.raw({ type: "application/json" }), webhookRouter)

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
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
    }
}))

app.use("/auth/me", meRouter)
app.use("/auth", createAuthRouter(authRateLimiter))
app.use("/cart", cartRouter)
app.use("/payment", paymentRouter)

app.use((_req, res) => {
    res.send("Server here for e-commerce site...")
})

app.listen(PORT, () => console.log("Server connected..."))
