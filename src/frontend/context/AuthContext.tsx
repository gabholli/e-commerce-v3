import { createContext, useEffect, useState, useContext, useCallback } from "react"
import type { ReactNode } from "react"
import type { AuthContextType } from "../../types/types"
import { checkAuth } from "../../utils/checkAuth"
import api from "../../backend/api"

const AuthContext = createContext<AuthContextType>({
    loggedIn: false,
    setLoggedIn: () => { },
    cartTotal: 0,
    refreshCart: () => { }
})

export default function AuthContextProvider({ children }: { children: ReactNode }) {

    const [loggedIn, setLoggedIn] = useState<boolean>(false)
    const [cartTotal, setCartTotal] = useState<number>(0)

    useEffect(() => {
        async function isSignedIn() {
            const checkAuthValue = await checkAuth()
            setLoggedIn(checkAuthValue)
        }
        isSignedIn()
    }, [])

    const refreshCart = useCallback(() => {
        if (!loggedIn) {
            setCartTotal(0)
            return
        }
        api.get("/cart/total-price")
            .then(response => setCartTotal(response.data.totalPrice))
            .catch(error => console.error(error))
    }, [loggedIn])

    useEffect(() => {
        refreshCart()
    }, [loggedIn, refreshCart])

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, cartTotal, refreshCart }}>
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth() {
    return useContext(AuthContext)
}