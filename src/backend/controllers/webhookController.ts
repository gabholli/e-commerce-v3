import type { Request, Response } from "express"
import Stripe from "stripe"
// import { deleteAllFromCartQuery } from "../models/cartModels.ts"

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY environment variable is not set!")
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function webhookHandler(req: Request, res: Response) {
    let event = req.body

    console.log("Webhook received!")  // 🔍
    console.log("Endpoint secret exists:", !!endpointSecret)  // 🔍

    if (endpointSecret) {
        const signature = req.headers["stripe-signature"]
        console.log("Signature exists:", !!signature)  // 🔍

        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                signature!,
                endpointSecret
            )
            console.log("Event type after parsing:", event.type)  // 🔍
        } catch (err) {
            if (err instanceof Error) {
                console.log("Signature verification failed:", err.message)  // 🔍
                return res.sendStatus(400)
            }
        }
    }
}