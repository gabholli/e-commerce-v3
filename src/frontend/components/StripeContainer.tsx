import PaymentForm from "./PaymentForm";

export default function StripeContainer({ onBack }: { onBack: () => void }) {
    return (
        <PaymentForm
            onBack={onBack}
        />
    )
}   