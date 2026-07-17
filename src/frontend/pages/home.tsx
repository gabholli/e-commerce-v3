import { useEffect, useState } from "react"
import Loading from "../components/Loading"
import axios from "axios"
import type { allProductsInterface } from "../../types/types"
import SideMenu from "../components/SideMenu"

export default function Home() {

    const [products, setProducts] = useState<allProductsInterface[]>()
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        setLoading(true)
        axios.get('https://fakestoreapi.com/products')
            .then(response => {
                setProducts(response.data)
                setLoading(false)
            })
            .catch(error => {
                console.error(error)
                setLoading(false)
            })

    }, [])

    const allProducts = products?.map((product) => {
        return (
            <div>
                <h1>{product.title}</h1>
            </div>
        )
    })

    if (loading) {
        return <Loading />
    }

    return (
        <main>
            <div>
                {allProducts}
            </div>
            <SideMenu />
        </main>
    )
}
