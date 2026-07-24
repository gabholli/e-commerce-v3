import { createContext, useEffect, useState, useContext } from "react"
import type { ReactNode } from "react"
import type { AuthContextType } from "../../types/types"
import { checkAuth } from "../../utils/checkAuth"

const AuthContext = createContext<AuthContextType>({
    loggedIn: false,
    setLoggedIn: () => { }
})

export default function AuthContextProvider({ children }: { children: ReactNode }) {

    const [loggedIn, setLoggedIn] = useState<boolean>(false)

    useEffect(() => {
        async function isSignedIn() {
            const checkAuthValue = await checkAuth()
            setLoggedIn(checkAuthValue)
        }
        isSignedIn()
    }, [])

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth() {
    return useContext(AuthContext)
}