import PaymentForm from "./PaymentForm";
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

const PUBLIC_KEY = "pk_test_51U04nq2fNJpTHnByzuJrp0UtfZzmKQhEWlImWBdnsrNHhffBvbklh6e9gvFW1dicO8nadM2T0VYRS2V6sWZqjcMs00yc2DdbCO"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer({ onBack, amount }: { onBack: () => void, amount: number }) {

    const options = {
        mode: "payment",
        currency: "usd",
        amount
    }

    return (
        <Elements stripe={stripeTestPromise} options={options}>
            <PaymentForm
                onBack={onBack}
                amount={amount}
            />
        </Elements>



    )
}   