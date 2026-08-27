const UserModel = require("../Model/userModel")

const authorizeAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user.id);
  
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    })  
  }
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
