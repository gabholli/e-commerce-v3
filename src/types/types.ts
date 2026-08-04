export interface allProductsInterface {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
}

export interface AuthContextType {
    loggedIn: boolean
    setLoggedIn: (value: boolean) => void
    cartTotal: number
    refreshCart: () => void
}