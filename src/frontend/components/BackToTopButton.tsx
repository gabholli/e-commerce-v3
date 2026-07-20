import { useEffect, useState } from "react"

export default function BackToTopButton() {
    const [backToTopButton, setBackToTopButton] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                setBackToTopButton(true)
            } else {
                setBackToTopButton(false)
            }
        })
    }, [])

    function scrollUp() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <div>
            {backToTopButton && (
                <button
                    className="fixed bg-neutral-300 text-black bottom-10 right-10 size-10 lg:size-16 text-2xl
                        flex justify-center items-center rounded-full pt-2"
                    onClick={scrollUp}>
                    ^
                </button>
            )}
        </div>
    )
}