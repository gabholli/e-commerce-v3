import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import api from "../../backend/api"
import React from "react"
import type { StripeCardElementOptions } from "@stripe/stripe-js"
import { useNavigate } from "react-router"
import { UserAuth } from "../context/AuthContext"
import toast from "react-hot-toast"

const CARD_OPTIONS: StripeCardElementOptions = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#000000",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }
}

export default function PaymentForm({ onBack, amount }: { onBack: () => void, amount: number }) {

    const { refreshCart } = UserAuth()

    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()

    async function submitForm(e: React.SubmitEvent) {
        e.preventDefault()
        if (!stripe || !elements) return

        const cardElement = elements.getElement(CardElement)

        if (!cardElement) return

        const { error, paymentMethod } = await stripe?.createPaymentMethod({
            type: "card",
            card: cardElement
        })

        if (!error) {

            try {
                const { id } = paymentMethod

                const response = await api.post("/payment", {
                    amount: amount,
                    id
                })

                if (response.data.success) {
                    await api.delete("/cart/all")
                    refreshCart()
                    toast.success("Payment successful! Thank you for your order.")
                    navigate("/")
                }
            } catch (error: any) {
                toast.error(error.response?.data?.error || "Payment failed. Please try again")
                console.error("Error", error)
            }
        } else {
            console.error(error.message)
        }
    }



    return (
        <>
            <form onSubmit={submitForm} autoComplete="off">
                <fieldset>
                    <div>
                        <CardElement options={CARD_OPTIONS} />
                    </div>
                </fieldset>
                <button type="submit">Pay</button>
            </form>

            <button
                onClick={onBack}
            >
                Go back to Cart
            </button>
        </>

    )
}