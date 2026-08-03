import type { Request, Response } from "express"
import Stripe from "stripe"
import { getTotalPriceFromCartQuery } from "../models/cartModels"

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY environment variable is not set!")
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function makePayment(req: Request, res: Response) {
    const userId = req.session.userId

    if (typeof userId !== "string") {
        return res.status(401).json({ error: "Unauthorized" })
    }

    let { id } = req.body

    try {
        const cartTotal = await getTotalPriceFromCartQuery(userId)
        const amount = Math.round(cartTotal.totalPrice * 100)

        if (amount <= 0) {
            return res.status(400).json({ error: "Cart is empty" })
        }

        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "E-commerce site",
            payment_method: id,
            confirm: true,
            metadata: {
                userId
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