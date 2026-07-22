import { useEffect, useState } from "react"
import Loading from "../components/Loading"
import axios from "axios"
import type { allProductsInterface } from "../../types/types"
import SideMenu from "../components/SideMenu"
import { Link, useLocation } from "react-router"

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

    console.log(products)

    const allProducts = filteredResults?.map((product) => {
        return (
            <div
                key={product.id}
                className="border-2 border-neutral-300 p-4 rounded-3xl
                flex flex-col justify-between gap-y-6"
            >
                <Link
                    to={`/product/${product.id}`}>
                    <img
                        className="h-80 object-scale-down mb-4 block m-auto"
                        src={product.image} alt="Product image" />
                    <div className="flex flex-col gap-y-6">
                        <div>
                            <h1 className="font-extrabold h-20">{product.title}</h1>
                        </div>
                        <div className="flex justify-between">
                            <p className="bg-green-500 text-white px-4 pb-1 rounded-3xl">{product.category}</p>
                            <p className="font-bold">${product.price}</p>
                        </div>
                    </div>
                </Link>
                <button
                    className="bg-green-500 text-white p-3 rounded-3xl cursor-pointer hover:underline"
                >Add to cart
                </button>

            </div>
        )
    })

    if (loading) {
        return <Loading />
    }

    return (
        <main className="flex flex-col justify-center md:items-start items-center
            md:grid md:grid-cols-[1fr_200px] layout-dashboard p-6 gap-y-6">
            <div className="area-sidebar md:self-start*
                rounded-lg">
                <SideMenu />
            </div>
            <div className="area-items grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allProducts}
            </div>
        </main>
    )
}
