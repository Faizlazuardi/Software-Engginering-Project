const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { handleJsonErrors } = require('./middleware/authMiddleware');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const productRoutes = require("./routes/productRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/products", productRoutes);

app.use(handleJsonErrors);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Running at ${PORT}`));