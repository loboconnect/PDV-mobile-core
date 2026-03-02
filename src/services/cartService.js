const CartItem = require("../models/Cart");

let cart = [];

function getCart() {
  return cart;
}

function addItem(itemData) {
  const { productId, qty, product } = itemData;
  const existing = cart.find((i) => i.productId === Number(productId));
  if (existing) {
    existing.qty += Number(qty || 1);
  } else {
    cart.push(new CartItem({ productId, qty, product }));
  }
  return cart;
}

function updateQty(productId, qty) {
  const item = cart.find((i) => i.productId === Number(productId));
  if (!item) return null;
  item.qty = Number(qty);
  return item;
}

function removeItem(productId) {
  const id = Number(productId);
  cart = cart.filter((i) => i.productId !== id);
  return cart;
}

function clear() {
  cart = [];
  return cart;
}

function getTotal() {
  return cart.reduce((sum, i) => {
    const price = i.product?.price || 0;
    return sum + price * i.qty;
  }, 0);
}

module.exports = { getCart, addItem, updateQty, removeItem, clear, getTotal };
