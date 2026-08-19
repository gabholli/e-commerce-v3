import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import api from "../../frontend/api"
import React from "react"
import { useNavigate } from "react-router"
import { UserAuth } from "../context/AuthContext"
import toast from "react-hot-toast"
import type { allProductsInterface } from "../../types/types"

export default function PaymentForm({ onBack, amount, cartItems }: { onBack: () => void, amount: number, cartItems: allProductsInterface[] }) {

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
            navigate(
                {
                    pathname: "/success"
                },
                {
                    state: {
                        amount: amount / 100,
                        cartItems: cartItems
                    }
                }
            )
        }

    }



    return (
        <main className="flex flex-col justify-center items-center gap-y-4">
            <form
                className="flex flex-col justify-center items-center gap-y-4"
                onSubmit={submitForm}
                autoComplete="off"
            >
                <fieldset>
                    <PaymentElement />
                </fieldset>
                <button className="bg-green-500 text-white px-4 py-2 w-full rounded-3xl cursor-pointer hover:underline" type="submit">Pay</button>
            </form>

            <button
                onClick={onBack}
                className="bg-green-500 text-white px-4 py-2 w-full rounded-3xl cursor-pointer hover:underline"
            >
                Go back to Cart
            </button>
        </main>

    )
}