const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const { verifyToken } = require("../middleware/authMiddleware");

// Transaction management
router.post("/", verifyToken, transactionController.createTransaction);
router.get("/", verifyToken, transactionController.getAllTransactions);
router.get("/summary", verifyToken, transactionController.getTransactionSummary);
router.get("/user/:userId", verifyToken, transactionController.getUserTransactions);
router.get("/:transactionId", verifyToken, transactionController.getTransaction);
router.patch("/:transactionId/status", verifyToken, transactionController.updateTransactionStatus);

// Transaction items management
router.post("/:transactionId/items", verifyToken, transactionController.addTransactionItem);
router.put("/:transactionId/items/:productId", verifyToken, transactionController.updateTransactionItem);
router.delete("/:transactionId/items/:productId", verifyToken, transactionController.removeTransactionItem);

module.exports = router;