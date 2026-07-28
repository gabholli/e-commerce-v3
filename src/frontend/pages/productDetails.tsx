import { useParams, Link } from 'react-router'
import { useState, useEffect } from 'react'
import toast from "react-hot-toast";
import type { allProductsInterface } from '../../types/types';

export default function ProductDetails() {

    const { id } = useParams()

    const [product, setProduct] = useState<allProductsInterface | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        async function fetchProductDetail() {
            setLoading(true)
            try {
                const response = await fetch(
                    `https://fakestoreapi.com/products/${id}`
                )
                const data = await response.json()
                setProduct(data)
                console.log(data)
            } catch (e) {
                if (e instanceof Error) {
                    setError(e)
                }
            } finally {
                setLoading(false)
            }
        }
        fetchProductDetail()
    }, [id])

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <h1>Loading...</h1>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center">
                <h1 className=" text-3xl mb-8 text-center mt-8">There was an error loading this page...</h1>
                <Link to="/" className="bg-green-300 px-4 py-2 rounded text-xl hover:underline">
                    Return to home
                </Link>
            </div>
        )
    }

    return (
        <div className='flex justify-center items-center flex-1'>

            <div className='product-details-layout gap-y-6 border-gray-300 border-2 rounded-2xl p-4 mx-2'>
                <img className="product-image-area place-self-center size-64 object-scale-down"
                    src={product?.image}
                    alt="Product" />
                <h1 className='self-end text-center font-extrabold product-title-area'>{product?.title}</h1>
                <p className='self-center text-center product-price-area'>${Number(product?.price ?? 0).toFixed(2)}</p>
                <p className='text-center product-description-area'>{product?.description}</p>
                <button className='product-button-area rounded-2xl bg-green-300 hover:underline active:bg-green-400 py-3 px-6 md:w-56'
                    onClick={() => {
                        toast.success("Item added to cart!")
                    }}>
                    Add to Cart
                </button>
            </div>
        </div>

    )
}
