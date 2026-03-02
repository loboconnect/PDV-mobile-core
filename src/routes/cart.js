const express = require("express");
const router = express.Router();

const cartService = require("../services/cartService");

// Get cart contents
router.get("/", (req, res) => {
  res.json(cartService.getCart());
});

// Add or increment item
router.post("/", (req, res) => {
  try {
    const updated = cartService.addItem(req.body);
    res.status(201).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update quantity
router.put("/:productId", (req, res) => {
  const item = cartService.updateQty(req.params.productId, req.body.qty);
  if (!item)
    return res.status(404).json({ error: "Item não encontrado no carrinho" });
  res.json(item);
});

// Remove single item
router.delete("/:productId", (req, res) => {
  const updated = cartService.removeItem(req.params.productId);
  res.json(updated);
});

// Clear cart
router.delete("/", (req, res) => {
  cartService.clear();
  res.json({ ok: true });
});

module.exports = router;
