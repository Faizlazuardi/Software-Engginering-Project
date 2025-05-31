const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { verifyToken } = require("../middleware/authMiddleware");

// Product management
router.get("/", productController.getAllProducts);
router.get("/search", productController.searchProducts);
router.get("/category/:categoryId", productController.getProductsByCategory);
router.get("/:productId", productController.getProduct);
router.post("/", verifyToken, productController.createProduct);
router.put("/:productId", verifyToken, productController.updateProduct);
router.delete("/:productId", verifyToken, productController.deleteProduct);

// Category management
router.get("/categories/all", productController.getAllCategories);
router.post("/categories", verifyToken, productController.createCategory);

// Brand management
router.get("/brands/all", productController.getAllBrands);
router.post("/brands", verifyToken, productController.createBrand);

module.exports = router;