const express = require("express")
const dotenv = require("dotenv")
const app = express()
const connectDB = require("./config/db")

dotenv.config()

connectDB()

const PORT = process.env.PORT || 1000



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})