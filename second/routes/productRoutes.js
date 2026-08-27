const {create , allProducts , product , update , del} = require("../controllers/productController")
const express = require("express")
const router = express.Router()
const adminVerify = require("../middlewares/adminMiddleware")
const protected = require("../middlewares/authMiddleware")

router.post("/create" , protected , adminVerify , create)
router.get("/all" , allProducts)
router.get("/:id" , product)
router.put("/:id" , update)
router.delete("/:id" , del)

module.exports = router
