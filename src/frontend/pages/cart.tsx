import { useEffect, useState } from "react"
import api from "../../frontend/api"
import Loading from "../components/Loading"
import { UserAuth } from "../context/AuthContext"
import StripeContainer from "../components/StripeContainer"
import type { allProductsInterface } from "../../types/types"
import DeleteOneItemModal from "../components/DeleteOneItemModal"

export default function Cart() {

    const { loggedIn, cartTotal, refreshCart } = UserAuth()

    const [showPayment, setShowPayment] = useState<boolean>(false)
    const [cartItems, setCartItems] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [selectedItem, setSelectedItem] = useState<allProductsInterface | null>(null)

    useEffect(() => {
        if (!loggedIn) return

        setLoading(true)
        api.get('/cart')
            .then((response: any) => {
                setCartItems(response.data.items)
                setLoading(false)
            })
            .catch((error: any) => {
                console.error(error)
                setLoading(false)
            })

    }, [loggedIn])

    useEffect(() => {
        if (!loggedIn) {
            setShowPayment(false)
            setCartItems([])
        }
    }, [loggedIn])

    function goBackToCartButton() {
        setShowPayment(false)
    }

    const cartItemsMap = cartItems?.map((product: allProductsInterface) => {
        return (
            <div
                key={product.productId}
                className="border-2 border-neutral-300 p-4 rounded-3xl
                flex flex-col justify-center gap-y-4 md:w-md"
            >
                <div
                    className="flex flex-col gap-y-4">
                    <hr></hr>
                    <div className="flex flex-col justify-center items-center">
                        <img
                            src={product.image}
                            className="h-10 w-10"
                        >
                        </img>
                    </div>
                    <div
                        className="text-center flex flex-col gap-y-4"
                    >
                        <h1>{product.title}</h1>
                        <p>${product.price * product.quantity}</p>
                        <p>Quantity: {product.quantity}</p>
                    </div>
                    <hr></hr>
                </div>
                <button
                    className="bg-green-500 text-white p-3 rounded-3xl cursor-pointer hover:underline"
                    onClick={() => setSelectedItem(product)}
                >
                    Remove item
                </button>
            </div>
        )
    })

    function handleDelete() {
        if (!selectedItem) return
        setCartItems((prev: any) => {
            return prev.filter((cartItem: any) => cartItem._id !== selectedItem._id)
        })
        refreshCart()
        setSelectedItem(null)

    }

    if (loading) return <Loading />

    return (
        <main className="p-8 flex flex-col flex-1 justify-center items-center gap-y-8">
            <div className="flex flex-col justify-center items-center">
                {showPayment ? (
                    <div className="flex flex-col justify-center items-center gap-y-4">
                        <h1 className="text-center">Make Payment:</h1>
                        <StripeContainer
                            onBack={goBackToCartButton}
                            amount={Math.round(cartTotal * 100)}
                            cartItems={cartItems}
                        />
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col md:flex-row md:flex-wrap gap-8 justify-center items-stretch">
                            {cartItemsMap}
                        </div>
                    </>
                )}
                {selectedItem !== null && (
                    <DeleteOneItemModal
                        isVisible={!!selectedItem}
                        onClose={() => setSelectedItem(null)}
                        item={selectedItem}
                        onDelete={handleDelete}
                    />
                )}

            </div>
            {cartItems.length > 0 && !showPayment && (
                <button
                    className="bg-green-500 text-white p-3 rounded-3xl cursor-pointer hover:underline w-60 md:w-80 block m-auto"
                    onClick={() => setShowPayment(true)}
                    disabled={!loggedIn}
                >
                    Make a payment
                </button>
            )
            }
            {cartItems.length === 0 && !showPayment && (
                <div>
                    <h1>Add items to fill up cart!</h1>
                </div>
            )
            }
        </main>
    )
}
