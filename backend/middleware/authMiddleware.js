const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    const header = req.headers.Authorization

    if (!header) {
        return (
            res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        )
    }
    console.log(header)

    const token = header.split(" ")[1]

    if (!token) {
        return (
            res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        )
    }

    console.log(token)

    try {
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)

        if (!verifiedToken) {
            return (
                res.status(401).json({
                    success: false,
                    message: "Unauthorized"
                })
            )
        }
        console.log(verifiedToken)
        req.userId = verifiedToken.userId
        next()

    }

    catch (error) {

        return (
            res.status(401).json({
                success: false,
                message: error.message
            })
        )
    }
}
module.exports = authMiddleware