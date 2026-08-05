export interface allProductsInterface {
    _id: number
    id: number
    productId: number
    title: string
    price: number
    quantity: number
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