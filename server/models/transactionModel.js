const db = require("../config/db");

// Transaction Header operations
exports.createTransaction = async (userId, paymentMethod) => {
    const client = await db.connect();
    try {
        await client.query('BEGIN');
        
        const result = await client.query(
            "INSERT INTO TransactionHeader (UserID, TransactionDate, PaymentMethod, TransactionStatus) VALUES ($1, CURRENT_TIMESTAMP, $2, $3) RETURNING TransactionID",
            [userId, paymentMethod, "pending"]
        );
        
        await client.query('COMMIT');
        return result.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

exports.updateTransactionStatus = async (transactionId, status) => {
    const result = await db.query(
        "UPDATE TransactionHeader SET TransactionStatus = $1 WHERE TransactionID = $2 RETURNING *",
        [status, transactionId]
    );
    return result.rows[0];
};

exports.getTransactionById = async (transactionId) => {
    const result = await db.query(
        "SELECT * FROM TransactionHeader WHERE TransactionID = $1",
        [transactionId]
    );
    return result.rows[0];
};

exports.getTransactionsByUser = async (userId) => {
    const result = await db.query(
        "SELECT * FROM TransactionHeader WHERE UserID = $1 ORDER BY TransactionDate DESC",
        [userId]
    );
    return result.rows;
};

exports.getAllTransactions = async () => {
    const result = await db.query(
        `SELECT th.*, u.UserName, u.UserEmail 
         FROM TransactionHeader th 
         LEFT JOIN MsUser u ON th.UserID = u.UserID 
         ORDER BY th.TransactionDate DESC`
    );
    return result.rows;
};

// Transaction Detail operations
exports.addTransactionDetail = async (transactionId, productId, quantity) => {
    const result = await db.query(
        "INSERT INTO TransactionDetail (TransactionID, ProductID, Quantity) VALUES ($1, $2, $3) RETURNING *",
        [transactionId, productId, quantity]
    );
    return result.rows[0];
};

exports.getTransactionDetails = async (transactionId) => {
    const result = await db.query(
        `SELECT td.*, p.ProductName, p.ProductPrice, b.BrandName, c.CategoryName
         FROM TransactionDetail td
         JOIN MsProduct p ON td.ProductID = p.ProductID
         LEFT JOIN MsBrand b ON p.BrandID = b.BrandID
         LEFT JOIN MsCategory c ON p.CategoryID = c.CategoryID
         WHERE td.TransactionID = $1`,
        [transactionId]
    );
    return result.rows;
};

exports.updateTransactionDetail = async (transactionId, productId, quantity) => {
    const result = await db.query(
        "UPDATE TransactionDetail SET Quantity = $3 WHERE TransactionID = $1 AND ProductID = $2 RETURNING *",
        [transactionId, productId, quantity]
    );
    return result.rows[0];
};

exports.removeTransactionDetail = async (transactionId, productId) => {
    await db.query(
        "DELETE FROM TransactionDetail WHERE TransactionID = $1 AND ProductID = $2",
        [transactionId, productId]
    );
};

// Analytics and reporting
exports.getTransactionSummary = async (startDate, endDate) => {
    const result = await db.query(
        `SELECT 
            COUNT(*) as total_transactions,
            SUM(CASE WHEN TransactionStatus = 'completed' THEN 1 ELSE 0 END) as completed_transactions,
            COUNT(DISTINCT UserID) as unique_customers
         FROM TransactionHeader 
         WHERE TransactionDate BETWEEN $1 AND $2`,
        [startDate, endDate]
    );
    return result.rows[0];
};

exports.getTopProducts = async (limit = 10) => {
    const result = await db.query(
        `SELECT p.ProductName, SUM(td.Quantity) as total_sold
         FROM TransactionDetail td
         JOIN MsProduct p ON td.ProductID = p.ProductID
         JOIN TransactionHeader th ON td.TransactionID = th.TransactionID
         WHERE th.TransactionStatus = 'completed'
         GROUP BY p.ProductID, p.ProductName
         ORDER BY total_sold DESC
         LIMIT $1`,
        [limit]
    );
    return result.rows;
};