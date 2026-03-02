// Cart item represents a product added by user
class CartItem {
  constructor({ productId, qty, product }) {
    if (!productId) throw new Error("productId required");
    this.productId = Number(productId);
    this.qty = Number(qty) || 1;
    this.product = product || null; // could store snapshot
  }
}

module.exports = CartItem;
