const mongoose = require("mongoose")
const validator = require("validator")
const UserModel = require("../Model/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = async (req, res) => {

    let { name, email, password } = req.body
    let role = "user"

    if (!name || !email || !password) {
        return (
            res.status(400).json({
                success: false,
                message: "name , email , password is required."
            })
        )
    }

    name = name.trim()
    email = email.trim()

    if (!name || !email || !password) {
        return (
            res.status(400).json({
                success: false,
                message: "name , email , password is required."
            })
        )
    }

    if (name.length < 3 || name.length > 12) {
        return (
            res.status(400).json({
                success: false,
                message: "Name must be between 3 and 12 characters."
            })
        )
    }
    if (!validator.isEmail(email)) {
        return (
            res.status(400).json({
                success: false,
                message: "invalid email"
            })
        )
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
        return (
            res.status(400).json({
                success: false,
                message: "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number."
            })
        )
    }

    try {
        const checkEmail = await UserModel.findOne({ email })
        if (checkEmail) {
            return (
                res.status(409).json({
                    success: false,
                    message: "Email is already registered. Please login instead."
                })
            )
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        password = hashedPassword

        const newUser = await UserModel.create({ name, email, password, role })

        res.status(201).json({
            success: true,
            message: "user registered successfully",
            data: {
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                id: newUser._id,
            }
        })
    }
    catch (error) {
        // Agar Mongoose Schema ki Validation Fail hoti hai (jaise bad email ya short password):
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: messages[0] // PEHLA Validation Error Frontend ko send kar do
            });
        }

        return (
            res.status(500).json({
                success: false,
                message: "internal server error"
            })
        )
    }

}

const login = async (req, res) => {
    let { email, password } = req.body

    if (!validator.isEmail(email)) {
        return res.status(400).json({
            success: false,
            message: "invalid email"
        })
    }

    try {

        const emailExist = await UserModel.findOne({ email }, "+password")
        if (!emailExist) {
            return res.status(404).json({
                success: false,
                message: "this user is not registered"
            })
        }

        const matchPassword = await bcrypt.compare(password, emailExist.password)

        if (!matchPassword) {
            return res.status(404).json({
                success: false,
                message: "email or password is invalid"
            })
        }
        const payload = {
            id: emailExist._id,
        }
        const token = await jwt.sign(payload , process.env.JWT_SECRET , {expiresIn : "7d"})

        res.status(200).json({
            success: true,
            message: "login successfully",
            data: {
                name: emailExist.name,
                email: emailExist.email,
                role: emailExist.role,
                id: emailExist._id
            },
            token: token
        })
    } catch (error) {

        return res.status(500).json({
            success: false,
            messsage: error.message
        })
    }


}

module.exports = { register, login }