import { Link, useLocation } from "react-router"
import type { allProductsInterface } from "../../types/types"

export default function Success() {

    const location = useLocation()
    const currentPrice = location.state?.amount
    const cartItemList = location.state?.cartItems

    console.log(cartItemList)

    const cartItemsMap = cartItemList?.map((item: allProductsInterface) => {
        return (
            <div
                key={item.productId}
                className="flex flex-col gap-y-4">
                <hr></hr>
                <div className="flex flex-col justify-center items-center">
                    <img
                        src={item.image}
                        className="h-10 w-10"
                    >
                    </img>
                </div>
                <div
                    className="text-center flex flex-col gap-y-4"
                >
                    <h1>{item.title}</h1>
                    <p>${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                </div>
                <hr></hr>
            </div>
        )
    })

    return (
        <main className="flex flex-col flex-1 justify-center items-center
            gap-y-8 px-2 pb-4">
            <div>
                <h1 className="text-center my-4 font-bold">Purchased items:</h1>
                {cartItemsMap}
            </div>
            <h1 className="text-center text-xl">
                Your payment for ${Number(currentPrice).toFixed(2)} was successful!
            </h1>
            <Link to="/" className="bg-green-500 px-4 py-2 rounded-3xl text-white text-lg hover:underline">
                Return to home
            </Link>
        </main>
    )
}