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
                <div className="flex flex-col h-full">
                    <img
                        className="h-80 object-scale-down mb-4 block m-auto"
                        src={product.image} alt="Product image" />
                    <div className="flex flex-col justify-center items-center gap-y-4">
                        <div>
                            <h1 className="font-extrabold flex-1">{product.title}</h1>
                        </div>
                        <div className="flex justify-between gap-x-8">
                            <p className="">Quantity: {product.quantity}</p>
                            <p className="font-bold">${product.price * product.quantity}</p>
                        </div>
                    </div>
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

    console.log(cartItems)

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
                        />
                    </div>
                ) : (
                    <>
                        <div className="flex flex-wrap gap-8 justify-center items-stretch">
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
