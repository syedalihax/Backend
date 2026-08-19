const UserModel = require("../models/User")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
    let { name, email, password } = req.body
    const role = "user"
    if (!name || !email || !password) {
        return (
            res.status(400).json({
                success: false,
                message: "name , email , password is required."
            })
        )
    }

    const trimmedName = name.trim()
    name = trimmedName
    const trimmedEmail = email.trim()
    email = trimmedEmail

    if (name == "" || email == "" || password == "") {
        return (
            res.status(400).json({
                success: false,
                message: "name , email , password is required."
            })
        )
    }
    if (name.length < 3 || name.length > 20) {
        return (
            res.status(400).json({
                success: false,
                message: "name should be at least 3 to 20 characters"
            })
        )
    }
    if (!validator.isEmail(email)) {
        return (
            res.status(400).json({
                success: false,
                message: "Invalid Email"
            })
        )
    }
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d]).{8,}$/
    if (!regexPassword.test(password)) {
        return (
            res.status(400).json({
                success: false,
                message: "Password should me at least 1 Capital letter , 1 small letter , 1 number and minimum 8"
            })
        )
    }

    try {
        const duplicatedEmail = await UserModel.findOne({ email })
        if (duplicatedEmail) {
            return (
                res.status(409).json({
                    success: false,
                    message: "this is already registered."
                })
            )
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        password = hashedPassword

        await UserModel.create({ name, email, password, role })


    } catch (error) {
        return (
            res.status(500).json({
                success: false,
                message: error.message
            })
        )
    }

    return (
        res.status(201).json({
            success: true,
            message: "User Registered successfully.",
            data: {
                name, email, role
            }
        })
    )
}
const login = async (req, res) => {
    let { email, password } = req.body
    if (!email || !password) {
        return (
            res.status(400).json({
                success: false,
                message: "email and password is required."
            })
        )
    }
    const trimmedEmail = email.trim()
    email = trimmedEmail
    if (!validator.isEmail(email)) {
        return (
            res.status(400).json({
                success: false,
                message: "Invalid Email"
            })
        )
    }

    try {
        const emailExist = await UserModel.findOne({ email }).select("+password")
        if (!emailExist) {
            return (
                res.status(401).json({
                    success: false,
                    message: "Unauthorized"
                })
            )
        }
        const passwordMacthed = await bcrypt.compare(password, emailExist.password)
        if (!passwordMacthed) {
            return (
                res.status(400).json({
                    success: false,
                    message: "email and password is invalid"
                })
            )
        }

        const token = jwt.sign({ userId: emailExist._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

        res.status(200).json({
            success: true,
            message: "Login successfully.",
            data: { name: emailExist.name, email: emailExist.email, role: emailExist.role },
            token: token
        })
    } catch (error) {
        return (
            res.status(500).json({
                success: false,
                message: error.message
            })
        )
    }
}

const profile = async (req, res) => {

    const verifiedUser = await UserModel.findById(req.userId)

    if (!verifiedUser) {
        return (
            res.status(404).json({
                success: false,
                message: "user not found"
            })
        )
    }
    res.status(200).json({
        success:true,
        data: verifiedUser
    })
}
module.exports = { register, login , profile}