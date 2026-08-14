const UserModel = require("../models/User")
const bcrypt = require("bcrypt")
const validator = require("validator")

const register = async (req, res) => {  
    const role = "user"


    let { name, email, password } = req.body

    if (!name) {
        return (
            res.status(400).json({
                success: false,
                message: "name is required"
            })
        )
    }
    const trimmedName = name.trim()

    if (trimmedName == "") {
        return (
            res.status(400).json({
                success: false,
                message: "name is required"
            })
        )
    }
    if (trimmedName.length < 3) {
        return (
            res.status(400).json({
                success: false,
                message: "name should be at least 3 characters"
            })
        )
    }
    if (trimmedName.length > 20) {
        return (
            res.status(400).json({
                success: false,
                message: "name should be less than 20 characters"
            })
        )
    }
    if (!email) {
        return (
            res.status(400).json({
                success: false,
                message: "email is required"
            })
        )
    }
    const trimmedEmail = email.trim()
    if (trimmedEmail == "") {
        return (
            res.status(400).json({
                success: false,
                message: "name is required"
            })
        )
    }
    if (!password) {
        return (
            res.status(400).json({
                success: false,
                message: "password is required"
            })
        )
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 8 characters and contain one uppercase letter, one lowercase letter and one number"
        })
    }


    if (!validator.isEmail(trimmedEmail)) {
        return (
            res.status(400).json({
                success: false,
                message: "Invalid email"
            })
        )
    }


    try {

        const emailExist = await UserModel.findOne({ email: trimmedEmail })

        if (emailExist) {
            return (
                res.status(409).json({
                    success: false,
                    message: "this email is already registered"
                })
            )
        }



        const hashedPassword = await bcrypt.hash(password, 10)
        password = hashedPassword


        await UserModel.create({ name: trimmedName, email: trimmedEmail, password, role })
    } catch (error) {
        return (
            res.status(500).json({
                success: false,
                message: error.message
            })
        )
    }
    res.status(201).json({
        success: true,
        message: "User Registered Successfully",
        data: { name: trimmedName, email: trimmedEmail, role }
    })
}

module.exports = { register }