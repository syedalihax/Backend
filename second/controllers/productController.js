const ProductModel = require("../Model/productModel");

const createProduct = async (req, res) => {
    const { title, description, price, category, stock } = req.body;
    const adminId = req.user.id;

    if (!title || !description || !price || !category) {
        return res.status(400).json({
            success: false,
            message: "Title, description, price, and category are required"
        });
    }

    try {
        const product = await ProductModel.create({
            title,
            description,
            price,
            category,
            stock,
            createdBy: adminId
        });

        res.status(201).json({
            success: true,
            message: "product created successfully",
            data: product
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const allProducts = async (req, res) => {
    try {
        const allProducts = await ProductModel.find();
        res.status(200).json({
            success: true,
            message: "products fetch successfully",
            products: allProducts
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const product = async (req, res) => {
    const productId = req.params.id;
    if (!productId) {
        return res.status(400).json({
            success: false,
            message: "product ID is required"
        });
    }
    try {
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });
        }
        res.status(200).json({
            success: true,
            message: "product fetch successfully",
            product: product
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateProduct = async (req, res) => {
    const productId = req.params.id;
    if (!productId) {
        return res.status(400).json({
            success: false,
            message: "product id is required"
        });
    }
    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(productId, req.body, { new: true });
        
        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product Updated",
            updatedProduct: updatedProduct
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const deletedProduct = await ProductModel.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Product Deleted Successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = { createProduct, allProducts, product, updateProduct, deleteProduct };