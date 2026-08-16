import rateLimit from "express-rate-limit"

export const authRateLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 2,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many attempts, please try again later" }
})