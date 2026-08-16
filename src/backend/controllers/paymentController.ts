import type { Request, Response } from "express"
import Stripe from "stripe"
import { getTotalPriceFromCartQuery } from "../models/cartModels.ts"

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY environment variable is not set!")
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function makePayment(req: Request, res: Response) {
    const userId = req.session.userId

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" })
    }

    try {
        const cartTotal = await getTotalPriceFromCartQuery(userId)
        const amount = Math.round(cartTotal.totalPrice * 100)

        if (amount <= 0) {
            return res.status(400).json({ error: "Cart is empty" })
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            description: "E-commerce site",
            metadata: {
                userId
            },
            automatic_payment_methods: {
                enabled: true,
            }
        })

        res.json({ clientSecret: paymentIntent.client_secret })

    } catch (error) {
        console.error("Error", error)
        res.status(500).json({ error: "Payment failed" })
    }
}