import { useEffect, useState } from "react"
import Loading from "../components/Loading"
import axios from "axios"
import type { allProductsInterface } from "../../types/types"
import SideMenu from "../components/SideMenu"
import { useLocation } from "react-router"

export default function Home() {

    const [products, setProducts] = useState<allProductsInterface[]>()
    const [loading, setLoading] = useState<boolean>(false)

    const location = useLocation()
    const categoryType = location.state?.category
    const filteredResults = categoryType
        ? products?.filter(product => product.category === categoryType)
        : products

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

    const allProducts = filteredResults?.map((product) => {
        return (
            <div key={product.id}>
                <h1>{product.title}</h1>
            </div>
        )
    })

    if (loading) {
        return <Loading />
    }

    return (
        <main className="flex flex-col justify-center items-start
            md:grid md:grid-cols-[1fr_200px] layout-dashboard">
            <div className="area-sidebar md:self-start*
                rounded-lg">
                <SideMenu />
            </div>
            <div className="area-items">
                {allProducts}
            </div>
        </main>
    )
}
