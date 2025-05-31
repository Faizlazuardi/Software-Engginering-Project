const db = require("../config/db");

exports.getAllProducts = async () => {
    const result = await db.query(
        `SELECT p.*, b.BrandName, c.CategoryName 
         FROM MsProduct p
         LEFT JOIN MsBrand b ON p.BrandID = b.BrandID
         LEFT JOIN MsCategory c ON p.CategoryID = c.CategoryID
         ORDER BY p.ProductName`
    );
    return result.rows;
};

exports.getProductById = async (productId) => {
    const result = await db.query(
        `SELECT p.*, b.BrandName, c.CategoryName 
         FROM MsProduct p
         LEFT JOIN MsBrand b ON p.BrandID = b.BrandID
         LEFT JOIN MsCategory c ON p.CategoryID = c.CategoryID
         WHERE p.ProductID = $1`,
        [productId]
    );
    return result.rows[0];
};

exports.getProductsByCategory = async (categoryId) => {
    const result = await db.query(
        `SELECT p.*, b.BrandName, c.CategoryName 
         FROM MsProduct p
         LEFT JOIN MsBrand b ON p.BrandID = b.BrandID
         LEFT JOIN MsCategory c ON p.CategoryID = c.CategoryID
         WHERE p.CategoryID = $1
         ORDER BY p.ProductName`,
        [categoryId]
    );
    return result.rows;
};

exports.searchProducts = async (searchTerm) => {
    const result = await db.query(
        `SELECT p.*, b.BrandName, c.CategoryName 
         FROM MsProduct p
         LEFT JOIN MsBrand b ON p.BrandID = b.BrandID
         LEFT JOIN MsCategory c ON p.CategoryID = c.CategoryID
         WHERE p.ProductName ILIKE $1 OR b.BrandName ILIKE $1 OR c.CategoryName ILIKE $1
         ORDER BY p.ProductName`,
        [`%${searchTerm}%`]
    );
    return result.rows;
};

exports.createProduct = async (brandId, categoryId, productName, productPrice, productStock) => {
    const result = await db.query(
        "INSERT INTO MsProduct (BrandID, CategoryID, ProductName, ProductPrice, ProductStock) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [brandId, categoryId, productName, productPrice, productStock]
    );
    return result.rows[0];
};

exports.updateProduct = async (productId, updateData) => {
    const { brandId, categoryId, productName, productPrice, productStock } = updateData;

    const result = await db.query(
        `UPDATE MsProduct SET BrandID = $1, CategoryID = $2, ProductName = $3, ProductPrice = $4, ProductStock = $5 WHERE ProductID = $6
         RETURNING *`,
        [brandId, categoryId, productName, productPrice, productStock, productId]
    );
    return result.rows[0];
};

exports.deleteProduct = async (productId) => {
    await db.query("DELETE FROM MsProduct WHERE ProductID = $1", [productId]);
};

// Category operations
exports.getAllCategories = async () => {
    const result = await db.query("SELECT * FROM MsCategory ORDER BY CategoryName");
    return result.rows;
};

exports.createCategory = async (categoryName) => {
    const result = await db.query(
        "INSERT INTO MsCategory (CategoryName) VALUES ($1) RETURNING *",
        [categoryName]
    );
    return result.rows[0];
};

// Brand operations
exports.getAllBrands = async () => {
    const result = await db.query("SELECT * FROM MsBrand ORDER BY BrandName");
    return result.rows;
};

exports.createBrand = async (brandName) => {
    const result = await db.query(
        "INSERT INTO MsBrand (BrandName) VALUES ($1) RETURNING *",
        [brandName]
    );
    return result.rows[0];
};