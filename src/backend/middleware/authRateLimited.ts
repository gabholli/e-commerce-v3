import rateLimit from "express-rate-limit"
// rate-limit-mongo does not currently provide TypeScript declarations.
// @ts-expect-error Missing declaration file for the JavaScript package.
import MongoStore from "rate-limit-mongo"

const mongoUri = process.env.ATLAS_URI

if (!mongoUri) {
    throw new Error("ATLAS_URI environment variable is not set!")
}

export const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many attempts, please try again in 15 minutes" },
    store: new MongoStore({
        url: mongoUri,
        collectionName: "rateLimits",
        expireTimeMs: 15 * 60 * 1000
    })
})