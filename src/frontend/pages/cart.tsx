import { useEffect, useState } from "react"
import api from "../../backend/api"
import Loading from "../components/Loading"
import { UserAuth } from "../context/AuthContext"
import StripeContainer from "../components/StripeContainer"

export default function Cart() {

    const { loggedIn, cartTotal } = UserAuth()

    const [showPayment, setShowPayment] = useState<boolean>(false)
    const [cartItems, setCartItems] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (!loggedIn) return

        setLoading(true)
        api.get('/cart')
            .then(response => {
                setCartItems(response.data.items)
                setLoading(false)
            })
            .catch(error => {
                console.error(error)
                setLoading(false)
            })

    }, [loggedIn])

    function goBackToCartButton() {
        setShowPayment(false)
    }

    console.log(cartItems)

    if (loading) return <Loading />

    return (
        <main>
            {showPayment ? (
                <div>
                    <h1>Make Payment:</h1>
                    <StripeContainer
                        onBack={goBackToCartButton}
                        amount={Math.round(cartTotal * 100)}
                    />
                </div>
            ) : (
                <>
                    <button
                        onClick={() => setShowPayment(true)}
                        disabled={cartItems.length === 0}
                    >
                        Make a payment
                    </button>
                </>
            )}
        </main>
    )
}
