import { useEffect, useState } from "react"
import api from "../../backend/api"
import Loading from "../components/Loading"
import { UserAuth } from "../context/AuthContext"
import StripeContainer from "../components/StripeContainer"

export default function Cart() {

    const { loggedIn } = UserAuth()

    const [showPayment, setShowPayment] = useState<boolean>(false)
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (!loggedIn) return

        setLoading(true)
        api.get('/cart')
            .then(response => {
                setCartItems(response.data)
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
                    />
                </div>
            ) : (
                <>
                    <button
                        onClick={() => setShowPayment(true)}
                    >
                        Make a payment

                    </button>
                </>
            )}
        </main>
    )
}
