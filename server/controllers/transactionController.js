const transactionModel = require("../models/transactionModel");
const productModel = require("../models/productModel");

exports.createTransaction = async (req, res) => {
    try {
        const { userId, paymentMethod, items } = req.body;

        if (!userId || !paymentMethod || !items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "User ID, payment method, and items are required" });
        }

        const transaction = await transactionModel.createTransaction(userId, paymentMethod);
        const transactionId = transaction.transactionid;

        for (const item of items) {
            if (!item.productId || !item.quantity || item.quantity <= 0) {
                return res.status(400).json({ message: "Each item must have valid productId and quantity" });
            }

            const product = await productModel.getProductById(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
            }

            await transactionModel.addTransactionDetail(transactionId, item.productId, item.quantity);
        }

        const transactionDetails = await transactionModel.getTransactionDetails(transactionId);
        
        res.status(201).json({
            message: "Transaction created successfully",
            transactionId,
            details: transactionDetails
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to create transaction" });
    }
};

exports.getTransaction = async (req, res) => {
    try {
        const { transactionId } = req.params;

        const transaction = await transactionModel.getTransactionById(transactionId);
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        const details = await transactionModel.getTransactionDetails(transactionId);

        res.json({
            transaction,
            details
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve transaction" });
    }
};

exports.updateTransactionStatus = async (req, res) => {
    try {
        const { transactionId } = req.params;
        const { status } = req.body;

        if (!status || !['pending', 'completed', 'cancelled'].includes(status)) {
            return res.status(400).json({ message: "Valid status is required (pending, completed, cancelled)" });
        }

        const transaction = await transactionModel.updateTransactionStatus(transactionId, status);
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.json({
            message: "Transaction status updated successfully",
            transaction
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to update transaction status" });
    }
};

exports.getUserTransactions = async (req, res) => {
    try {
        const { userId } = req.params;

        const transactions = await transactionModel.getTransactionsByUser(userId);
        res.json({ transactions });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve user transactions" });
    }
};

exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await transactionModel.getAllTransactions();
        res.json({ transactions });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve transactions" });
    }
};

exports.addTransactionItem = async (req, res) => {
    try {
        const { transactionId } = req.params;
        const { productId, quantity } = req.body;

        if (!productId || !quantity || quantity <= 0) {
            return res.status(400).json({ message: "Valid product ID and quantity are required" });
        }

        const transaction = await transactionModel.getTransactionById(transactionId);
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        if (transaction.transactionstatus !== 'pending') {
            return res.status(400).json({ message: "Cannot modify completed or cancelled transaction" });
        }

        const product = await productModel.getProductById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        await transactionModel.addTransactionDetail(transactionId, productId, quantity);

        res.json({ message: "Item added to transaction successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to add item to transaction" });
    }
};

exports.updateTransactionItem = async (req, res) => {
    try {
        const { transactionId, productId } = req.params;
        const { quantity } = req.body;

        if (!quantity || quantity <= 0) {
            return res.status(400).json({ message: "Valid quantity is required" });
        }

        const transaction = await transactionModel.getTransactionById(transactionId);
        if (!transaction || transaction.transactionstatus !== 'pending') {
            return res.status(400).json({ message: "Cannot modify completed or cancelled transaction" });
        }

        await transactionModel.updateTransactionDetail(transactionId, productId, quantity);

        res.json({ message: "Transaction item updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to update transaction item" });
    }
};

exports.removeTransactionItem = async (req, res) => {
    try {
        const { transactionId, productId } = req.params;

        const transaction = await transactionModel.getTransactionById(transactionId);
        if (!transaction || transaction.transactionstatus !== 'pending') {
            return res.status(400).json({ message: "Cannot modify completed or cancelled transaction" });
        }

        await transactionModel.removeTransactionDetail(transactionId, productId);

        res.json({ message: "Item removed from transaction successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to remove item from transaction" });
    }
};

exports.getTransactionSummary = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        
        const start = startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const end = endDate || new Date();

        const summary = await transactionModel.getTransactionSummary(start, end);
        const topProducts = await transactionModel.getTopProducts(5);

        res.json({
            summary,
            topProducts,
            dateRange: { startDate: start, endDate: end }
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve transaction summary" });
    }
};