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
        const seller = await UserModel.findById({ _id : createdBy })
        const product = await ProductModel.create({ title, description, price, category, stock, seller })


        res.status(201).json({
            success: true,
            message: "product created successfully",
            product: product,
            seller : {id : seller._id , name : seller.name}
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}
const allProducts = async (req, res) => {

}
const product = async (req, res) => {

}
const update = async (req, res) => {

}
const del = async (req, res) => {

}

module.exports = { create, allProducts, product, update, del }