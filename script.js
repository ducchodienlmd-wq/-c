const products = [
  { id: 1, name: "Sofa Verona", category: "Sofa", price: 24900000, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1470&auto=format&fit=crop" },
  { id: 2, name: "Bàn ăn Marbelia", category: "Bàn", price: 18900000, image: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?q=80&w=1470&auto=format&fit=crop" },
  { id: 3, name: "Ghế thư giãn Alto", category: "Ghế", price: 9900000, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1470&auto=format&fit=crop" },
  { id: 4, name: "Đèn trần Aurelia", category: "Đèn", price: 5200000, image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1470&auto=format&fit=crop" },
  { id: 5, name: "Decor Gốm Siena", category: "Decor", price: 1600000, image: "https://images.unsplash.com/photo-1616627547584-bf28cee262db?q=80&w=1470&auto=format&fit=crop" },
  { id: 6, name: "Bàn trà Luna", category: "Bàn", price: 7900000, image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=1470&auto=format&fit=crop" }
];

const grid = document.getElementById("products-grid");
const search = document.getElementById("search");
const categoryFilter = document.getElementById("category-filter");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const cartDrawer = document.getElementById("cart-drawer");
const overlay = document.getElementById("overlay");

const cart = [];

const formatVND = (n) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);

function renderProducts(items) {
  grid.innerHTML = items.map(product => `
    <article class="product">
      <img src="${product.image}" alt="${product.name}" loading="lazy"/>
      <div class="product-content">
        <small>${product.category}</small>
        <h3>${product.name}</h3>
        <div class="price-row">
          <strong>${formatVND(product.price)}</strong>
          <button data-id="${product.id}">Thêm</button>
        </div>
      </div>
    </article>
  `).join("");
}

function applyFilters() {
  const q = search.value.trim().toLowerCase();
  const cat = categoryFilter.value;

  const result = products.filter(p => {
    const matchedText = p.name.toLowerCase().includes(q);
    const matchedCat = cat === "all" || p.category === cat;
    return matchedText && matchedCat;
  });

  renderProducts(result);
}

function renderCart() {
  cartItems.innerHTML = cart.map(item => `
    <li>
      <div>
        <strong>${item.name}</strong><br/>
        <small>${formatVND(item.price)}</small>
      </div>
      <button data-remove="${item.id}">Xóa</button>
    </li>
  `).join("") || "<li>Chưa có sản phẩm nào trong giỏ.</li>";

  const total = cart.reduce((sum, i) => sum + i.price, 0);
  cartTotal.textContent = formatVND(total);
  cartCount.textContent = String(cart.length);
}

function toggleCart(open) {
  cartDrawer.classList.toggle("open", open);
  overlay.hidden = !open;
  cartDrawer.setAttribute("aria-hidden", String(!open));
}

document.getElementById("cart-btn").addEventListener("click", () => toggleCart(true));
document.getElementById("close-cart").addEventListener("click", () => toggleCart(false));
overlay.addEventListener("click", () => toggleCart(false));

search.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);

grid.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-id]");
  if (!btn) return;
  const product = products.find(p => p.id === Number(btn.dataset.id));
  if (!product) return;
  cart.push(product);
  renderCart();
  toggleCart(true);
});

cartItems.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-remove]");
  if (!btn) return;
  const id = Number(btn.dataset.remove);
  const idx = cart.findIndex(i => i.id === id);
  if (idx >= 0) {
    cart.splice(idx, 1);
    renderCart();
  }
});

renderProducts(products);
renderCart();
