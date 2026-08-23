const mongoose = require("mongoose")

const connectDB = async () => {
try {
    await mongoose.connect(process.env.mongoDB_URI)
    console.log("DataBase connected successfully ✅")

} catch (error) {
    console.log(error.message)    
}
    
}

module.exports = connectDB