// Simple Product model/constructor with basic validation
class Product {
  constructor({ id, name, price, sku, stock }) {
    if (!name) throw new Error("Product name required");
    if (price == null || isNaN(price))
      throw new Error("Product price must be a number");
    this.id = id;
    this.name = String(name);
    this.price = Number(price);
    this.sku = sku ? String(sku) : null;
    this.stock = Number(stock) || 0;
  }
}

module.exports = Product;
