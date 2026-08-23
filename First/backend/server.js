const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors")

const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")

const app = express()

dotenv.config()
connectDB()

app.use(cors())
app.use(express.json())

let PORT = process.env.PORT

if (!PORT) {
    PORT = 3000
}

app.use("/api/auth" , authRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} ✅`);
});
