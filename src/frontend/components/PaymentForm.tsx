export default function PaymentForm({ onBack, amount }: { onback: () => void, amount: number }) {
    return (
        <button
            onClick={onBack}
        >
            Go back to Cart
        </button>
    )
}