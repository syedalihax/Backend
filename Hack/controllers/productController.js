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
        const CreatedProduct = await ProductModel.create({
            title,
            description,
            price,
            category,
            stock,
            images
        })
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
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
const updateProduct = async (req, res) => {
    const productID = req.params.id
    const update = req.body

    try {
        if (Object.keys(update).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide data to update"
            })
        }

        const updatedProduct = await ProductModel.findByIdAndUpdate(
            productID,
            update,
            { new: true, runValidators: true }
        )

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
const deleteProduct = async (req, res) => {
    const productID = req.params.id
    try {
        const deletedProduct = await ProductModel.findByIdAndDelete(productID)
        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })

        }
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
module.exports = { createProduct, getProducts, getOneProduct, updateProduct, deleteProduct }