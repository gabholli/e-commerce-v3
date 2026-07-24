import api from "../backend/api"

export async function checkAuth() {
    try {
        const res = await api.get("/auth/me")
        const user = res.data
        if (!user.isLoggedIn) {
            return false
        }
        return true

    } catch (err) {
        console.log(err, 'Auth check failed')
        return false
    }
}