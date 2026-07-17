import express from "express"
// import cors from "cors"
// import createTable from "./src/backend/createTable.tsx"

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

app.use((req, res) => {
    console.log(req.body)
    res.send("Server here for e-commerce site...")
})

app.listen(PORT, () => console.log("Server connected..."))

// createTable().then(() => {
//     app.listen(PORT, () => console.log("Server connected..."))
// })