const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db.js")
const authRoutes = require("./routes/authController")
dotenv.config()

const app = express()
app.use(express.json())

let port = process.env.port

if(!port){
    port = 3000
}

connectDB()

app.use("/api/auth" , authRoutes)

app.listen(port , ()=>{
    console.log(` -- server is running on port ${port} -- `)
})