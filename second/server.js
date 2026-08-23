const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db.js")

dotenv.config()

const app = express()

let port = process.env.port

if(!port){
    port = 3000
}

connectDB()

app.listen(port , ()=>{
    console.log(` -- server is running on port ${port} -- `)
})