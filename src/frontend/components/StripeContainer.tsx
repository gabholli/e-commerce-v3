import PaymentForm from "./PaymentForm";

const PUBLIC_KEY = "pk_test_51U04nq2fNJpTHnByzuJrp0UtfZzmKQhEWlImWBdnsrNHhffBvbklh6e9gvFW1dicO8nadM2T0VYRS2V6sWZqjcMs00yc2DdbCO"

export default function StripeContainer({ onBack }: { onBack: () => void }) {
    return (
        <PaymentForm
            onBack={onBack}
        />
    )
}   