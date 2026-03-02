// PDV Mobile - Sistema de Vendas | Frontend JS
const productsEl = document.getElementById("products");
const cartBtn = document.getElementById("cartBtn");
const cartPanel = document.getElementById("cartPanel");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");
const clearCartBtn = document.getElementById("clearCart");
const cartItemsEl = document.getElementById("cartItems");
const cartCountEl = document.getElementById("cartCount");
const subtotalEl = document.getElementById("subtotal");
const cartTotalEl = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");
const searchInput = document.getElementById("searchInput");
const toastContainer = document.getElementById("toastContainer");

let products = [];
let cart = [];
let filteredProducts = [];

// Toast notification helper
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="toast-message">${message}</span>`;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// Fetch products from API
async function fetchProducts() {
  try {
    const res = await fetch("/products");
    products = await res.json();
    filteredProducts = products;
    renderProducts();
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
    showToast("Erro ao carregar produtos", "error");
  }
}

// Render product cards
function renderProducts() {
  productsEl.innerHTML = "";
  if (filteredProducts.length === 0) {
    productsEl.innerHTML =
      '<p style="grid-column: 1/-1; text-align: center; color: #6b7280; padding: 2rem;">Nenhum produto encontrado</p>';
    return;
  }

  filteredProducts.forEach((p) => {
    const card = document.createElement("article");
    card.className = "product-card";
    const icon = ["Café Expresso", "Pão na Chapa", "Suco Natural"].includes(
      p.name,
    )
      ? "☕ 🥖 🧃".split(" ")[p.id - 1]
      : "📦";

    card.innerHTML = `
      <div class="product-icon">${icon}</div>
      <div class="product-name">${p.name}</div>
      <div class="product-sku">${p.sku || "N/A"}</div>
      <div class="product-stock">Estoque: ${p.stock}</div>
      <div class="product-price">R$ ${p.price.toFixed(2)}</div>
      <button class="btn-add">+ Adicionar</button>
    `;

    card
      .querySelector(".btn-add")
      .addEventListener("click", () => addToCart(p));
    productsEl.appendChild(card);
  });
}

// Load cart from API
async function loadCart() {
  try {
    const res = await fetch("/cart");
    cart = await res.json();
    updateCartUI();
  } catch (err) {
    console.error("Erro ao carregar carrinho:", err);
  }
}

// Add item to cart
async function addToCart(product) {
  try {
    const res = await fetch("/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product.id, qty: 1, product }),
    });
    await res.json();
    await loadCart();
    showToast(`${product.name} adicionado ao carrinho`, "success");
  } catch (err) {
    console.error("Erro ao adicionar:", err);
    showToast("Erro ao adicionar item", "error");
  }
}

// Update quantity
async function updateQty(productId, newQty) {
  try {
    await fetch(`/cart/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ qty: newQty }),
    });
    await loadCart();
  } catch (err) {
    console.error("Erro ao atualizar quantidade:", err);
  }
}

// Remove item from cart
async function removeItem(productId) {
  try {
    await fetch(`/cart/${productId}`, { method: "DELETE" });
    await loadCart();
    showToast("Item removido", "success");
  } catch (err) {
    console.error("Erro ao remover:", err);
  }
}

// Clear cart
async function clearCart() {
  if (confirm("Deseja limpar todo o carrinho?")) {
    try {
      await fetch("/cart", { method: "DELETE" });
      await loadCart();
      showToast("Carrinho limpo", "success");
    } catch (err) {
      console.error("Erro ao limpar:", err);
    }
  }
}

// Update cart UI
function updateCartUI() {
  cartItemsEl.innerHTML = "";

  if (cart.length === 0) {
    cartItemsEl.innerHTML =
      '<div class="empty-cart"><div class="empty-cart-icon">🛒</div><p>Carrinho vazio</p></div>';
    cartCountEl.textContent = "0";
    subtotalEl.textContent = "R$ 0.00";
    cartTotalEl.textContent = "R$ 0.00";
    return;
  }

  let total = 0;
  cart.forEach((item) => {
    const price = item.product?.price || 0;
    const subtotal = price * item.qty;
    total += subtotal;

    const itemEl = document.createElement("div");
    itemEl.className = "cart-item";
    itemEl.innerHTML = `
      <div class="cart-item-header">
        <div class="cart-item-name">${item.product?.name || "Produto"}</div>
        <button class="cart-item-remove" data-id="${item.productId}">✕</button>
      </div>
      <div class="cart-item-details">
        <span>R$ ${price.toFixed(2)} un.</span>
        <span>Subtotal: <strong>R$ ${subtotal.toFixed(2)}</strong></span>
      </div>
      <div class="cart-item-qty">
        <button class="qty-btn minus" data-id="${item.productId}">−</button>
        <div class="qty-value">${item.qty}</div>
        <button class="qty-btn plus" data-id="${item.productId}">+</button>
      </div>
    `;

    itemEl
      .querySelector(".cart-item-remove")
      .addEventListener("click", () => removeItem(item.productId));
    itemEl.querySelector(".qty-btn.minus").addEventListener("click", () => {
      if (item.qty > 1) updateQty(item.productId, item.qty - 1);
    });
    itemEl.querySelector(".qty-btn.plus").addEventListener("click", () => {
      updateQty(item.productId, item.qty + 1);
    });

    cartItemsEl.appendChild(itemEl);
  });

  cartCountEl.textContent = cart.reduce((sum, i) => sum + i.qty, 0);
  subtotalEl.textContent = `R$ ${total.toFixed(2)}`;
  cartTotalEl.textContent = `R$ ${total.toFixed(2)}`;
}

// Finalize sale
checkoutBtn.addEventListener("click", async () => {
  if (!cart.length) {
    showToast("Carrinho vazio", "error");
    return;
  }

  try {
    const total = cart.reduce(
      (sum, i) => sum + (i.product?.price || 0) * i.qty,
      0,
    );
    const res = await fetch("/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart, total, customer: null }),
    });
    const data = await res.json();

    if (data.ok) {
      showToast(`✓ Venda finalizada! ID: ${data.sale.id}`, "success");
      await loadCart();
      closeCartPanel();
    } else {
      showToast(data.error || "Erro na venda", "error");
    }
  } catch (err) {
    console.error("Erro ao finalizar:", err);
    showToast("Erro ao processar venda", "error");
  }
});

// Cart panel controls
function openCartPanel() {
  cartPanel.classList.add("open");
  cartOverlay.classList.add("visible");
}

function closeCartPanel() {
  cartPanel.classList.remove("open");
  cartOverlay.classList.remove("visible");
}

cartBtn.addEventListener("click", openCartPanel);
closeCart.addEventListener("click", closeCartPanel);
clearCartBtn.addEventListener("click", clearCart);
cartOverlay.addEventListener("click", closeCartPanel);

// Search/filter products
searchInput.addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();
  filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(term) || p.sku.toLowerCase().includes(term),
  );
  renderProducts();
});

// Init
fetchProducts();
loadCart();
