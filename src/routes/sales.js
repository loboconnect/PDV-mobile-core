const express = require("express");
const router = express.Router();

const salesService = require("../services/salesService");

// finalize sale using cart automatically
router.post("/", (req, res) => {
  try {
    const sale = salesService.finalizeSale(req.body);
    res.status(201).json({ ok: true, sale });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// list recorded sales
router.get("/", (req, res) => {
  res.json(salesService.list());
});

module.exports = router;
