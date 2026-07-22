import express from "express"
// import cors from "cors"
import createTable from "./src/backend/createTable.ts"

const app = express()

// app.use(cors({
//     origin: [
//         "http://localhost:5173",
//         "https://gabholli-harry-potter.netlify.app"
//     ]
// }))

const PORT = process.env.PORT || 3001

app.use(express.json())

// app.use((req, _res, next) => {
//     console.log("Content-Type:", req.headers["content-type"])
//     console.log("Body:", req.body)
//     next()
// })

// app.use("/auth/me", meRouter)
// app.use("/auth", authRouter)
// app.use("products", productsRouter)
// app.use("/cart", cartRouter)

app.use((_req, res) => {
    res.send("Server here for e-commerce site...")
})

createTable().then(() => {
    app.listen(PORT, () => console.log("Server connected..."))
})