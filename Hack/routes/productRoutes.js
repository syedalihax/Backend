const express = require("express")
const router = express.Router()
const {createProduct , getProducts , getOneProduct} = require("../controllers/productController")
const adminMiddleware = require("../middleware/adminMiddleware")
const authMiddleware = require("../middleware/authMiddleware")
router.post("/create_product" , authMiddleware , adminMiddleware , createProduct)
router.get("/All_Products" , getProducts)
router.get("/:id" , getOneProduct) 
module.exports = router