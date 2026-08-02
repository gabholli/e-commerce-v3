import { useEffect, useState } from "react"
import api from "../../backend/api"
import Loading from "../components/Loading"
import { UserAuth } from "../context/AuthContext"

export default function Cart() {

    const { loggedIn } = UserAuth()

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

    console.log(cartItems)

    if (loading) return <Loading />

    return (
        <main>

        </main>
    )
}
