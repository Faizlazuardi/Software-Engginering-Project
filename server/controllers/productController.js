const productModel = require("../models/productModel");

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productModel.getAllProducts();
        res.json({ products });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve products" });
    }
};

exports.getProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await productModel.getProductById(productId);
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ product });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve product" });
    }
};

exports.getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const products = await productModel.getProductsByCategory(categoryId);
        res.json({ products });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve products" });
    }
};

exports.searchProducts = async (req, res) => {
    try {
        const { q } = req.query;
        
        if (!q) {
            return res.status(400).json({ message: "Search query is required" });
        }

        const products = await productModel.searchProducts(q);
        res.json({ products });
    } catch (error) {
        res.status(500).json({ message: "Failed to search products" });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { brandId, categoryId, productName, productPrice, productStock } = req.body;

        if (!productName || !productPrice || productPrice <= 0) {
            return res.status(400).json({ message: "Product name and valid price are required" });
        }

        const product = await productModel.createProduct(brandId, categoryId, productName, productPrice, productStock);
        res.status(201).json({ 
            message: "Product created successfully", 
            product 
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to create product" });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const { brandId, categoryId, productName, productPrice, productStock } = req.body;

        if (!productName || !productPrice || productPrice <= 0 || !productStock || productStock < 0) {
            return res.status(400).json({ message: "Invalid product data" });
        }

        const updated = await productModel.updateProduct(productId, {
            brandId, categoryId, productName, productPrice, productStock
        });

        if (!updated) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product updated successfully", product: updated });
    } catch (error) {
        res.status(500).json({ message: "Failed to update product" });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        // Check if product exists
        const product = await productModel.getProductById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        await productModel.deleteProduct(productId);
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete product" });
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await productModel.getAllCategories();
        res.json({ categories });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve categories" });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;

        if (!categoryName) {
            return res.status(400).json({ message: "Category name is required" });
        }

        const category = await productModel.createCategory(categoryName);
        res.status(201).json({ 
            message: "Category created successfully", 
            category 
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to create category" });
    }
};

exports.getAllBrands = async (req, res) => {
    try {
        const brands = await productModel.getAllBrands();
        res.json({ brands });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve brands" });
    }
};

exports.createBrand = async (req, res) => {
    try {
        const { brandName } = req.body;

        if (!brandName) {
            return res.status(400).json({ message: "Brand name is required" });
        }

        const brand = await productModel.createBrand(brandName);
        res.status(201).json({ 
            message: "Brand created successfully", 
            brand 
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to create brand" });
    }
};