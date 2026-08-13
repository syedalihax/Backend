const mongoose = require("mongoose")

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MongoDB_URI)
        console.log("Mongo DB CONNECTED ✅")
    } catch (error) {
        console.log(error.message)
    }
    
}

module.exports = connectDB