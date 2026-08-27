const UserModel = require("../Model/userModel")
const adminVerify = async (req , res , next) =>{
    const userId = req.user.id
    
    try {
        const userData = await UserModel.find({_id : userId})
        
        if(!userData){
            return res.status(404).json({
                success:false,
                message : "user not found"
            })
        }
        const {role} = userData[0]
        if(role !== "admin"){
            return res.status(403).json({
                success:false,
                message:"Forbidden : you have not permission to do that action"
            })
        }
        next()
    } catch (error) {
        res.status(401).json({
            success:false,
            message : error.message
        })
    }
    
}
module.exports = adminVerify