import { Link } from "react-router"

export default function NotFound() {
    return (
        <div className="flex flex-col flex-1 justify-center items-center
            gap-y-8 px-2">
            <h1 className="text-center text-3xl">
                Sorry, the page you were looking for was not found
            </h1>
            <Link to="/" className="bg-green-500 px-4 py-2 rounded text-white text-xl hover:underline">
                Return to home
            </Link>
        </div>
    )
}