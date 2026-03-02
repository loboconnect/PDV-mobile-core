const Sale = require("../models/Sale");
const cartService = require("./cartService");
const productService = require("./productService");

let sales = [];

function list() {
  return sales;
}

function finalizeSale({ customer }) {
  const cart = cartService.getCart();
  if (!cart.length) throw new Error("Cart is empty");
  // calculate total and reduce stock
  let total = 0;
  const items = cart.map((i) => {
    const prod = productService.getById(i.productId);
    if (prod && prod.stock >= i.qty) {
      prod.stock -= i.qty; // decrement stock
    } else {
      // if stock insufficient, we still include as zero price
      // in real logic should throw error or reject
    }
    const price = prod ? prod.price : 0;
    total += price * i.qty;
    return { productId: i.productId, qty: i.qty, product: prod };
  });

  const id = sales.length ? sales[sales.length - 1].id + 1 : 1;
  const sale = new Sale({ id, items, total, customer });
  sales.push(sale);
  cartService.clear();
  return sale;
}

module.exports = { list, finalizeSale };
