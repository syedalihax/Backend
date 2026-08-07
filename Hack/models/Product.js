const mongoose = require("mongoose")


const productSchema = new mongoose.Schema(
    
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            minLength: 10,
            maxLength: 200
        },

        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
            minLength: 20,
            maxLength: 1000
        },

        price: {
            type: Number,
            required: [true, "Price is required"],
            min: 0
        },

        category: {
            type: String,
            required: true,
            enum: [
                "Mobiles",
                "Electronics",
                "Fashion",
                "Books"
            ]
        },

        stock: {
            type: Number,
            default: 0,
            min: 0
        },

        images: [{
            type: String
        }],

        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },

        numReviews: {
            type: Number,
            default: 0
        },

        isAvailable: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
)





const ProductModel = mongoose.model("Product", productSchema)
module.exports = ProductModel