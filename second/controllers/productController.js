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
        const {_id} = await UserModel.findById({ _id: createdBy })
        const product = await ProductModel.create({ title, description, price, category, stock, sellerId : _id})


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
            success:false,
            message:error.message
        })
    }
}
const product = async (req, res) => {
    const productId = req.params.id
    if(!productId){
        return res.status(400).json({
            success:false,
            message:"product id is required"
        })
    }
    try {
        const product = await ProductModel.findById({_id : productId})
        res.status(200).json({
            success:true,
            message:"product fetch successfully",
            product : product
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }

}
const update = async (req, res) => {

}
const del = async (req, res) => {

}

module.exports = { create, allProducts, product, update, del }