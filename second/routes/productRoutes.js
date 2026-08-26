const {createProduct , allProducts , product , updateProduct , deleteProduct} = require("../controllers/productController")
const protected = require("../middlewares/authMiddleware")
const authorizeAdmin = require("../middlewares/adminMiddleware")
const express = require("express")
const router = express.Router()

router.post("/product" , protected , authorizeAdmin , createProduct)
router.get("/products" , allProducts)
router.get("/products/:id" , product )
router.put("/products/:id" , protected , authorizeAdmin , updateProduct )
router.delete("/products/:id" , protected , authorizeAdmin , deleteProduct)
module.exports = router
