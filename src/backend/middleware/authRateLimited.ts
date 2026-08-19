import rateLimit from "express-rate-limit"

export const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many attempts, please try again in 15 minutes" },
    keyGenerator: (req) => {
        const forwarded = req.headers['x-forwarded-for']
        const ip = Array.isArray(forwarded)
            ? forwarded[0]
            : forwarded?.split(',')[0] || req.ip
        return ip as string
    }
})