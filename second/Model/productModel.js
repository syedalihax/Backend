const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: [true, "title is required"] },
    description: { type: String, required: [true, "description is required"] },
    price: { type: Number, required: [true, "price is required"] },
    category: { type: String, required: [true, "category is required"] },
    stock : {type : Number , required: [true, "stock is required"]},
    sellerId: { type: String, required: [true, "seller id is required"] }
})

const ProductModel = mongoose.model("productModel" , productSchema)

module.exports = ProductModel   