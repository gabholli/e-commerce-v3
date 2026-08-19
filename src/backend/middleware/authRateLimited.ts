import rateLimit from "express-rate-limit"
// rate-limit-mongo does not currently provide TypeScript declarations.
// @ts-expect-error Missing declaration file for the JavaScript package.
import MongoStore from "rate-limit-mongo"

export const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many attempts, please try again in 15 minutes" },
    store: new MongoStore({
        url: process.env.ATLAS_URI!,
        collectionName: "rateLimits",
        expireTimeMs: 15 * 60 * 1000
    })
})