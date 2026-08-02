import type { Request, Response } from "express"
import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY environment variable is not set!")
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function makePayment(req: Request, res: Response) {
    const userId = req.session.userId

    if (typeof userId !== "string") {
        return res.status(401).json({ error: "Unauthorized" })
    }

    let { amount, id } = req.body

    try {
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