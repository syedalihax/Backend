const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, "Name is required"],
        trim: true,
        minLength:3,
        maxLength:30
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true,

    },
    hashedPassword: {
        type: String,
        select: false
    },
    role:{
        type: String,
        default: "user"
    }
})

const UserModel = mongoose.model("User" , userSchema)
module.exports = UserModel