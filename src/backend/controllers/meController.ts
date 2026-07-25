import type { Request, Response } from "express"

export async function getMe(req: Request, res: Response) {
    if (req.session.userId) {
        return res.json({ isLoggedIn: true })
    }
    return res.json({ isLoggedIn: false })
}