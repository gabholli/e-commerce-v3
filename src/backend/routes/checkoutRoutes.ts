// routes/checkout.ts
import express from "express"
import { createCheckoutSession } from "../controllers/checkoutController"

export const checkoutRouter = express.Router()

checkoutRouter.post("/create-checkout-session", createCheckoutSession)