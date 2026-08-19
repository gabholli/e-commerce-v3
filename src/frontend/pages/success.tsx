import { Link, useLocation } from "react-router"

export default function Success() {

    const location = useLocation()
    const currentPrice = location.state.amount

    return (
        <div className="flex flex-col flex-1 justify-center items-center
            gap-y-8 px-2">
            <h1 className="text-center text-3xl">
                Your payment for ${currentPrice} was successful!
            </h1>
            <Link to="/" className="bg-green-500 px-4 py-2 rounded-3xl text-white text-xl hover:underline">
                Return to home
            </Link>
        </div>
    )
}