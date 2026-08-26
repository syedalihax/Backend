const profile = require("../controllers/userController")
const express = require("express")
const protected = require("../middlewares/authMiddleware")
const router = express.Router()

router.get('/profile' , protected , profile)

module.exports = router
