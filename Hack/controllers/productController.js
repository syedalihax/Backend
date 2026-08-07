const ProductModel = require("../models/Product")

const createProduct = async (req, res) => {
    const { title, description, price, category, stock, images } = req.body
    try {
        if (!title || !description || price === undefined || !category) {
            return res.status(400).json({
                success: false,
                message: "title , description , price and category is required"
            })
        }
        const CreatedProduct = await ProductModel.create(req.body)
        res.status(201).json({
            success: true,
            message: "Product Created",
            data: CreatedProduct
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}
const getProducts = async (req, res) => {
    try {

        const products = await ProductModel.find();

        return res.status(200).json({
            success: true,
            data: products
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
const getOneProduct = async (req, res) => {
    const productID = req.params.id
    try {
        const singleProduct = await ProductModel.findById(productID)
        
        if (!singleProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Product Found",
            data: singleProduct
        })
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message
        })
    }
}
module.exports = { createProduct, getProducts, getOneProduct }