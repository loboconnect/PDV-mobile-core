require("dotenv").config();
const express = require("express");
const path = require("path");

const productsRouter = require("./routes/products");
const cartRouter = require("./routes/cart");
const salesRouter = require("./routes/sales");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend
app.use(express.static(path.join(__dirname, "..", "public")));

// API routes
app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/sales", salesRouter);

// Health
app.get("/health", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`PDV server running on http://localhost:${PORT}`),
);

module.exports = app;
