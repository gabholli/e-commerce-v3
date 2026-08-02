import type { Request, Response } from "express"

export async function makePayment(req: Request, res: Response) {
    console.log("Make payment")
}