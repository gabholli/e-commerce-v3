import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3001",
    withCredentials: true
})

// const api = axios.create({
//     baseURL: "https://e-commerce-v3-qb17.onrender.com",
//     withCredentials: true
// })


export default api