export default function PaymentForm({ onBack }: { onback: () => void }) {
    return (
        <button
            onClick={onBack}
        >
            Go back to Cart
        </button>
    )
}