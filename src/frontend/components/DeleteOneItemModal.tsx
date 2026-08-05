import toast from "react-hot-toast"
import type { allProductsInterface } from "../../types/types"
import api from "../api"

export default function DeleteOneItemModal(
    {
        isVisible,
        onClose,
        item,
        onDelete


    }:
        {
            isVisible: boolean,
            onClose: () => void,
            item: allProductsInterface,
            onDelete: () => void
        }) {
    if (!isVisible) return null

    function handleClose(e: React.MouseEvent<HTMLDivElement>) {
        if (e.currentTarget.id === "wrapper") onClose()
    }

    async function deleteCartItem() {
        try {
            await api.delete(`/cart/${item._id}`)
            onDelete()
            onClose()
        } catch (error) {
            console.error(error)
            toast.error("Error deleting item")
        }
    }

    return (
        <div
            className="fixed inset-0 flex
                justify-center items-center m-4"
            onClick={(e) => handleClose(e)}
            id="wrapper"
        >
            <div className="flex flex-col">
                <button
                    onClick={() => onClose()}
                    className="place-self-end"
                >
                    X
                </button>
                <div className="bg-neutral-200 p-4 md:text-2xl">
                    <h1>
                        {item.quantity === 1
                            ? `Remove ${item.title} from cart?`
                            : `Remove all ${item.quantity} of ${item.title} from cart?`
                        }
                    </h1>
                    <div className="flex justify-center items-center gap-x-4">
                        <button onClick={deleteCartItem}>Yes</button>
                        <button onClick={() => onClose()}>No</button>
                    </div>
                </div>

            </div>
        </div>
    )
}
