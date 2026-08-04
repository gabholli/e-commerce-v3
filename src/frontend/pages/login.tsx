import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { UserAuth } from "../context/AuthContext";
import api from "../../frontend/api";

export default function LogIn() {

    const { setLoggedIn } = UserAuth()

    const navigate = useNavigate()

    async function loginSubmit(formData: FormData) {
        try {
            let emailValue = formData.get("email") as string
            let passwordValue = formData.get("password") as string
            if (!emailValue || !passwordValue) return

            const response = await api.post("/auth/login",
                { email: emailValue, password: passwordValue })

            if (response.data.message) {
                setLoggedIn(true)
                toast.success("You are logged in!")
                navigate("/")
            }

        } catch (error: any) {
            console.error(error.message)
            toast.error(error.response?.data?.error || "Error logging in.")
        }
    }

    return (
        <main className="flex flex-1 justify-center items-center">
            <form
                className="max-w-md w-full m-auto p-4 md:p-20 flex flex-col gap-y-4 justify-center items-center"
                action={loginSubmit}
            >
                <h2 className="self-start font-bold text-lg">Sign In</h2>
                <p className="self-start text-lg">
                    Don't have an account yet? <Link className="text-green-500" to="/signup">Sign up</Link>
                </p>
                <div className="flex flex-col py-4 w-full">
                    <input
                        className=" indent-4 p-2 border-2 rounded-xl"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        required
                    />
                </div>
                <div className="flex flex-col py-4 w-full">
                    <input
                        className="indent-4 p-2 border-2 rounded-xl"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        required
                    />
                </div>

                <button className="w-24 hover:bg-green-400 rounded-xl mt-4 px-4 py-2 bg-green-500 text-white cursor-pointer">Sign In</button>
                {/* {error && <p className="text-red-600 text-center pt-4">{error}</p>} */}
            </form >
        </main >
    )
}
