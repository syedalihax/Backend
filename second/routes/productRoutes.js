const {create , allProducts , product , update , del} = require("../controllers/productController")
const express = require("express")
const router = express.Router()
const adminVerify = require("../middlewares/adminMiddleware")
const protected = require("../middlewares/authMiddleware")

router.post("/create" , protected , adminVerify , create)
router.get("/all" , allProducts)
router.get("/:id" , product)
router.put("/:id" , protected , adminVerify , update)
router.delete("/:id" , protected , adminVerify , del)

module.exports = router
