const {register , login , logOut} = require("../controllers/authController")
const express = require("express")
const router = express.Router()

router.post("/register" , register)
router.post("/login" , login)
router.post("/logout" , logOut)
module.exports = router
