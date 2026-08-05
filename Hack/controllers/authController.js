const UserModel = require("../models/User")


const registerUser = async (req, res) => {
    const { name, email } = req.body
    try {
        const userCreated = await UserModel.create(req.body)
        res.status(201).json({
            success: true,
            message: "User Registered",
            data: userCreated
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = registerUser