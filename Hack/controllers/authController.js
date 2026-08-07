const UserModel = require("../models/User")
const bcrypt = require("bcrypt")
const validator = require("validator")
const jwt = require("jsonwebtoken")

const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z].{7,15}$/;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and password are required."
            })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email."
            })
        }

        if (!PASSWORD_REGEX.test(password)) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must start with a letter, contain at least one uppercase letter, one lowercase letter, one number, and be 8-16 characters long."
            })
        }

        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "This email already exists."
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const userCreated = await UserModel.create({ name, email, hashedPassword, role })
        res.status(201).json({
            success: true,
            message: "User Registered",
            data: {
                name,
                email,
                role,
            }

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(400).json({
                "success": false,
                "message": "Email and password are required."
            })
        }
        const user = await UserModel.findOne({ email }).select("+hashedPassword");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid email or password."
            })
        }


        const comparePassword = await bcrypt.compare(password, user.hashedPassword)
        if (!comparePassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );
        return res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
module.exports = { registerUser, loginUser }