import type { Request, Response } from "express"
import Stripe from "stripe"
import { deleteAllFromCartQuery } from "../models/cartModels.ts"

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY environment variable is not set!")
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function webhookHandler(req: Request, res: Response) {
    let event = req.body

    if (endpointSecret) {
        const signature = req.headers["stripe-signature"]

        if (!signature) {
            return res.status(400).json({ error: "Missing stripe-signature header" })
        }

        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                signature,
                endpointSecret
            )
        } catch (err) {
            if (err instanceof Error) {
                console.log("Webhook signature verification failed: ", err.message)
                return res.sendStatus(400)
            }
        }
    }

    switch (event.type) {
        case "payment_intent.succeeded":
            const paymentIntent = event.data.object as Stripe.PaymentIntent
            const userId = paymentIntent.metadata.userId
            console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`)
            if (userId) {
                await deleteAllFromCartQuery(userId)
                console.log("Cart cleared for user: ", userId)
            }
            break
        case "payment_intent.processing":
            const processingIntent = event.data.object as Stripe.PaymentIntent
            console.log("Payment processing: ", processingIntent.id)

            break
        case "payment_intent.payment_failed":
            const failedPayment = event.data.object as Stripe.PaymentIntent
            console.log("Payment failed: ", failedPayment.id)

            break

        default:
            console.log(`Unhandled event type: ${event.type} `)

    }

    res.json({ received: true })
}