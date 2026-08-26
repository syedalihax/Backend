const UserModel = require("../Model/userModel")

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