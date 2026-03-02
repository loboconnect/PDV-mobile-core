// Sale model holds items and metadata
class Sale {
  constructor({ id, items, total, customer, createdAt }) {
    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error("Sale must have at least one item");
    }
    this.id = id;
    this.items = items;
    this.total = Number(total) || 0;
    this.customer = customer || null;
    this.createdAt = createdAt || new Date().toISOString();
  }
}

module.exports = Sale;
