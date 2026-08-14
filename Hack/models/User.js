const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{type:String , required:[true , "name is required"] },
    email:{type:String , required:[true , "email is requried"] , unique:[true , "this email is registered"]},
    password:{type:String , required:[true , "password is requried"] },
    role:{type:String , default:"user" , enum:['user' , 'admin']}
})
const UserModel = mongoose.model("userModel" , userSchema)
 
module.exports = UserModel