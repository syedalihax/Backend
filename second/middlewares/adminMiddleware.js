const UserModel = require("../Model/userModel")
<<<<<<< HEAD
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
=======

const authorizeAdmin = async (req, res, next) => {
  const user = await UserModel.findById(req.user.id);
  
  if (user && user.role === "admin") {
    next(); 
    
  } else {
    return res.status(403).json({
      success: false,
      message: "Forbidden: Admin access required",
    });
  }
};

module.exports = authorizeAdmin
>>>>>>> d02238169f99fd8665863cdfc642b78e133a2d81
