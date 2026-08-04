import * as dotenv from 'dotenv'
dotenv.config()

import { MongoClient } from "mongodb"
const connectionString = process.env.ATLAS_URI || ""
const client = new MongoClient(connectionString, {
    tls: true,
    tlsAllowInvalidCertificates: true
})
let conn: any
try {
    conn = await client.connect()
} catch (e) {
    console.error(e)
}
let db = conn.db("e-commerce-v3")
export default db