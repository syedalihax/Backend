const UserModel = require("../Model/userModel")

const profile = async (req, res) => {

    try {
        const userData = await UserModel.findById(req.user.id).select("-password")
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "data fetch successfully",
            data: userData
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
module.exports = profile