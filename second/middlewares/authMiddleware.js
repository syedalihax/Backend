const jwt = require("jsonwebtoken")
const TokenModel = require("../Model/tokenModel")

const protected = async (req, res, next) => {

    const userData = req.headers.authorization

    if (!userData) {
        return res.status(401).json({
            success: false,
            message: "unAuthorized"
        })
    }
    if (!userData.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "unAuthorized"
        })
    }
    const token = userData.split(" ")[1]
    try {
        const blackListed = await TokenModel.findOne({token})
        
        if(blackListed){
            return res.status(401).json({
                success:false,
                message: "unAuthorized"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "unAuthorized"
        })
    }
}
module.exports = protected