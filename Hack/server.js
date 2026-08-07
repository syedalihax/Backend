const express = require("express")
const dotenv = require("dotenv")
const app = express()
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
dotenv.config()

connectDB()

const PORT = process.env.PORT || 1000

app.use(express.json())

app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})