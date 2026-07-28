import { NavLink } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useRef, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import api from "../../backend/api";
import toast from "react-hot-toast";

export default function HeaderWithHamburger() {

    const { loggedIn, setLoggedIn } = UserAuth()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [cartCount, setCartCount] = useState<number>(0)

    let menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handler(e: MouseEvent): void {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handler)

        return () => {
            document.removeEventListener("mousedown", handler)
        }
    }, [])

    useEffect(() => {
        if (!loggedIn) {
            setCartCount(0)
            return
        }

        api.get("/cart/cart-count")
            .then(response => {
                setCartCount(response.data.totalItems)
            })
            .catch(error => {
                console.error(error)
            })
    }, [loggedIn])

    function handleSignOut() {
        api.get("/auth/logout")
            .then(response => {
                console.log(response.data)
                setLoggedIn(false)
                toast.success("Logged out successfully!")
            })
            .catch(error => {
                console.error(error)
                toast.error("Error logging out.")
            })
    }

    return (
        <header
            ref={menuRef}
            className="flex justify-between items-center
            text-black py-6 px-8 md:px-16 xl:px-32 border-b-2 border-neutral-300 text-center">
            <section className="p-2">
                <h1 className="text-xl md:text-4xl font-bold">React Shop</h1>
            </section>
            <nav className="hidden lg:flex items-center gap-12
                    font-semibold md:text-3xl">
                <NavLink
                    className="hover:underline"
                    to="/" end>
                    Home
                </NavLink>
                <NavLink
                    className="hover:underline"
                    to="/cart" end>
                    {`Cart (${cartCount})`}
                </NavLink>
                {!loggedIn ? (
                    <NavLink
                        className="hover:underline"
                        to="login" end>
                        Log In / Sign Up
                    </NavLink>
                ) : null}
                {loggedIn ? (
                    <button
                        className="cursor-pointer hover:underline"
                        onClick={handleSignOut}
                    >
                        Sign Out
                    </button>
                ) : null}
            </nav>

            <div
                onClick={() => setIsOpen(open => !open)}
                className="lg:hidden block cursor-pointer">
                <GiHamburgerMenu />
            </div>

            <div className={`absolute xl:hidden top-24 -mt-1
                    left-0 w-full bg-neutral-400
                    flex-col items-center gap-6 font-semibold
                    transform transition-transform
                    ${isOpen ? "flex" : "hidden"}`}>
                <nav
                    className="w-full text-center
                        p-4 transition-all
                        cursor-pointer flex flex-col gap-y-6">
                    <NavLink
                        className="hover:underline"
                        to="/" end>
                        Home
                    </NavLink>
                    <NavLink
                        className="hover:underline"
                        to="/cart" end>
                        {`Cart (${cartCount})`}
                    </NavLink>
                    {!loggedIn ? (
                        <NavLink
                            className="hover:underline"
                            to="login" end>
                            Log In / Sign Up
                        </NavLink>
                    ) : null}
                    {loggedIn ? (
                        <button
                            className="cursor-pointer hover:underline"
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </button>
                    ) : null}
                </nav>
            </div>
        </header>
    )
}
