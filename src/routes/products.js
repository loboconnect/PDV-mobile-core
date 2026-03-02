const express = require("express");
const router = express.Router();

const productService = require("../services/productService");

// List products
router.get("/", (req, res) => {
  res.json(productService.getAll());
});

// Get single product
router.get("/:id", (req, res) => {
  const prod = productService.getById(req.params.id);
  if (!prod) return res.status(404).json({ error: "Produto não encontrado" });
  res.json(prod);
});

// Create product
router.post("/", (req, res) => {
  try {
    const created = productService.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update product
router.put("/:id", (req, res) => {
  const updated = productService.update(req.params.id, req.body);
  if (!updated)
    return res.status(404).json({ error: "Produto não encontrado" });
  res.json(updated);
});

// Delete product
router.delete("/:id", (req, res) => {
  const ok = productService.remove(req.params.id);
  if (!ok) return res.status(404).json({ error: "Produto não encontrado" });
  res.json({ ok: true });
});

module.exports = router;
