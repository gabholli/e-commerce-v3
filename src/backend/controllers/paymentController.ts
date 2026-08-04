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

    const { id } = req.body

    try {
        const cartTotal = await getTotalPriceFromCartQuery(userId)
        const amount = Math.round(cartTotal.totalPrice * 100)

        if (amount <= 0) {
            return res.status(400).json({ error: "Cart is empty" })
        }

        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            description: "E-commerce site",
            payment_method: id,
            confirm: true,
            metadata: {
                userId
            },
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: "never"
            }
        })
        console.log("Payment", payment)
        res.json({
            message: "Payment successful",
            success: true
        })
    } catch (error) {
        console.error("Error", error)
        res.json({
            message: "Payment failed",
            success: false
        })
    }
}