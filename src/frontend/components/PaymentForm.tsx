import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import api from "../../frontend/api"
import React from "react"
import { useNavigate } from "react-router"
import { UserAuth } from "../context/AuthContext"
import toast from "react-hot-toast"

export default function PaymentForm({ onBack, amount }: { onBack: () => void, amount: number }) {

    const { refreshCart } = UserAuth()

    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()

    async function submitForm(e: React.SubmitEvent) {
        e.preventDefault()
        if (!stripe || !elements) return

        const { error: submitError } = await elements.submit()

        if (submitError) {
            toast.error(submitError.message || "Payment failed")
            return
        }

        const res = await api.post("/payment", { amount })

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret: res.data.clientSecret,
            confirmParams: {
                return_url: `${window.location.origin}/success`
            },
            redirect: "if_required"
        })

        if (error) {
            toast.error(error.message || "Payment failed")
        } else {
            await api.delete("/cart/all")
            refreshCart()
            navigate("/success")
        }

    }



    return (
        <>
            <form onSubmit={submitForm} autoComplete="off">
                <fieldset>
                    <PaymentElement />
                </fieldset>
                <button className="hover:cursor-pointer" type="submit">Pay</button>
            </form>

            <button
                onClick={onBack}
                className="hover:cursor-pointer"
            >
                Go back to Cart
            </button>
        </>

    )
}