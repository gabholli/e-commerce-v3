import { Link } from "react-router";

export default function SideMenu() {
    return (
        <>
            <nav className="flex flex-col justify-center items-center md:hidden p-4
                gap-y-4">
                <Link
                    className="hover:underline"
                    to="/"
                    state={{ category: "men's clothing" }}>
                    Men's Clothing
                </Link>
                <Link
                    className="hover:underline"
                    to="/"
                    state={{ category: "women's clothing" }}>
                    Women's Clothing
                </Link>
                <Link
                    className="hover:underline"
                    to="/"
                    state={{ category: "jewelery" }}>
                    Jewelry
                </Link>
                <Link
                    className="hover:underline"
                    to="/"
                    state={{ category: "electronics" }}>
                    Electronics
                </Link>
            </nav >
            <nav className="hidden md:flex flex-col justify-center items-center">
                <Link
                    className="hover:underline"
                    to="/"
                    state={{ category: "men's clothing" }}>
                    Men's Clothing
                </Link>
                <Link
                    className="hover:underline"
                    to="/"
                    state={{ category: "women's clothing" }}>
                    Women's Clothing
                </Link>
                <Link
                    className="hover:underline"
                    to="/"
                    state={{ category: "jewelery" }}>
                    Jewelry
                </Link>
                <Link
                    className="hover:underline"
                    to="/"
                    state={{ category: "electronics" }}>
                    Electronics
                </Link>
            </nav>
        </>
    )
}
