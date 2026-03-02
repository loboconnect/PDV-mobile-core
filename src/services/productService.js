const Product = require("../models/Product");

// simple in-memory store
let products = [
  new Product({
    id: 1,
    name: "Café Expresso",
    price: 6.5,
    sku: "CAF001",
    stock: 50,
  }),
  new Product({
    id: 2,
    name: "Pão na Chapa",
    price: 4.0,
    sku: "PAO001",
    stock: 30,
  }),
  new Product({
    id: 3,
    name: "Suco Natural",
    price: 7.0,
    sku: "SUC001",
    stock: 20,
  }),
];

function getAll() {
  return products;
}

function getById(id) {
  return products.find((p) => p.id === Number(id)) || null;
}

function create(data) {
  const id = products.length ? products[products.length - 1].id + 1 : 1;
  const prod = new Product({ id, ...data });
  products.push(prod);
  return prod;
}

function update(id, changes) {
  const prod = getById(id);
  if (!prod) return null;
  Object.assign(prod, changes);
  // ensure types
  if (changes.price != null) prod.price = Number(changes.price);
  if (changes.stock != null) prod.stock = Number(changes.stock);
  return prod;
}

function remove(id) {
  const idx = products.findIndex((p) => p.id === Number(id));
  if (idx === -1) return false;
  products.splice(idx, 1);
  return true;
}

module.exports = { getAll, getById, create, update, remove };
