import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3001"
})

// const api = axios.create({
//     baseURL: "https://e-commerce-v3-qb17.onrender.com"
// })


export default api