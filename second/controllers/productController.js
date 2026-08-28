const ProductModel = require("../Model/productModel")
const UserModel = require("../Model/userModel")

const create = async (req, res) => {
    let { title, description, price, category, stock } = req.body
    let createdBy = req.user.id
    if (!title || !description || !price || !category || !stock || !createdBy) {
        return res.status(400).json({
            success: false,
            message: "title , description , price , category , stock and seller Id is required"
        })
    }
    try {
        const { _id } = await UserModel.findById({ _id: createdBy })
        if(!_id){
            return res.status(404).json({
                success:false,
                message:"seller not found"
            })
        }
        const product = await ProductModel.create({ title, description, price, category, stock, sellerId: _id })


        res.status(201).json({
            success: true,
            message: "product created successfully",
            product: product
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}
const allProducts = async (req, res) => {
    try {
        const products = await ProductModel.find()
        res.status(200).json({
            success: true,
            message: "All Products fetches successfully",
            products: products
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
const product = async (req, res) => {
    const productId = req.params.id
    if (!productId) {
        return res.status(400).json({
            success: false,
            message: "product id is required"
        })
    }
    try {
        const product = await ProductModel.findById({ productId })
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "product not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "product fetch successfully",
            product: product
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })

    }

}
const update = async (req, res) => {
    const productId = req.params.id
    const update = req.body
    if (!productId) {
        return res.status(400).json({
            success: false,
            message: "product id is required"
        })
    }
    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(productId, update, { returnDocument: 'after', runValidators: true })

        res.status(200).json({
            success: true,
            message: "Product update successfully",
            updatedProduct: updatedProduct
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
const del = async (req, res) => {
    const ProductId = req.params.id
    if (!ProductId) {
        return res.status(400).json({
            success: false,
            message: "product id is required"
        })
    }
    try {

        const deletedProduct = await ProductModel.findByIdAndDelete(ProductId)

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: "product not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "product deleted successfully",
            product: deletedProduct
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = { create, allProducts, product, update, del }