const express = require("express")
const app = express()
const dotenv = require("dotenv")
const connectDB = require("./config/db")

dotenv.config()
connectDB()

app.use(express.json())

let PORT = process.env.PORT

if (PORT == undefined) {
    PORT = 3000
    console.log("PORT is not defined in .env file so by default PORT is set to 3000")
}

app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}`)
})
