const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, default: 1 },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required: true
    }
}, { timestamps: true });

const ProductModel = mongoose.model("productModel", productSchema)

module.exports = ProductModel