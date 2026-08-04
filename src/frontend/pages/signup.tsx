import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../../frontend/api";
import { useState } from "react";
import Loading from "../components/Loading";

export default function SignUp() {

    const navigate = useNavigate()

    const [loading, setLoading] = useState<boolean>(false)

    async function signUpSubmit(formData: FormData) {
        try {
            let emailValue = formData.get("email") as string
            let passwordValue = formData.get("password") as string
            if (!emailValue || !passwordValue) {
                toast.error("Please fill out all fields.")
                return
            }

            setLoading(true)

            const res = await api.post("/auth/register",
                { email: emailValue, password: passwordValue })
            toast.success(res.data.message)
            navigate("/")

        } catch (error: any) {
            console.error(error.message)
            toast.error(error.response?.data?.error || "Error signing up.")
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <Loading />

    return (
        <main className="flex flex-1 justify-center items-center">
            <form
                className="max-w-md w-full p-4 md:p-20 flex flex-col gap-y-4 justify-center items-center"
                action={signUpSubmit}
            >
                <h2 className="self-start font-bold text-lg">Sign Up</h2>
                <p className="self-start text-lg">
                    Already have an account? <Link className="text-green-500" to="/login">Sign in</Link>
                </p>
                <div className="flex flex-col py-4 w-full">
                    <input
                        className="indent-4 p-2 border-2 rounded-xl"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                    />
                </div>
                <div className="flex flex-col py-4 w-full">
                    <input
                        className="indent-4 p-2 border-2 rounded-xl"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                    />
                </div>
                <button className="w-24 hover:bg-green-400 rounded-xl mt-4 px-4 py-2 bg-green-500 text-white cursor-pointer">Sign Up</button>
                {/* {error && <p className="text-red-600 text-center pt-4">{error}</p>} */}
            </form>
        </main >
    )
}
