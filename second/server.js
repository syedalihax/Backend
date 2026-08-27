const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db.js")
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")

dotenv.config()

const app = express()
app.use(express.json())

let port = process.env.port

if(!port){
    port = 3000
}

connectDB()

app.use("/api/auth" , authRoutes)
app.use("/api/users", userRoutes);
app.use("/api/products" , productRoutes)

app.listen(port , ()=>{
    console.log(` -- server is running on port ${port} -- `)
})