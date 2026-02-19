const products = [
  {
    id: 1,
    name: 'Sofa Florence',
    category: 'Phòng khách',
    price: 45900000,
    image:
      'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1000&q=80',
    desc: 'Da bò Ý, khung gỗ sồi tự nhiên, phong cách hiện đại tối giản.'
  },
  {
    id: 2,
    name: 'Bàn ăn Royal Oak',
    category: 'Phòng ăn',
    price: 32900000,
    image:
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80',
    desc: 'Bề mặt gỗ óc chó chống xước, thiết kế dành cho 6-8 người.'
  },
  {
    id: 3,
    name: 'Giường ngủ Luna',
    category: 'Phòng ngủ',
    price: 38900000,
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
    desc: 'Đầu giường bọc nỉ cao cấp, tích hợp đèn LED cảm biến.'
  },
  {
    id: 4,
    name: 'Đèn thả Aurora',
    category: 'Trang trí',
    price: 12900000,
    image:
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1000&q=80',
    desc: 'Pha lê mài thủ công, ánh sáng vàng dịu cho không gian sang trọng.'
  },
  {
    id: 5,
    name: 'Ghế lounge Aspen',
    category: 'Phòng khách',
    price: 18900000,
    image:
      'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=1000&q=80',
    desc: 'Thiết kế công thái học, phù hợp phòng khách hoặc góc đọc sách.'
  },
  {
    id: 6,
    name: 'Kệ TV Monarch',
    category: 'Phòng khách',
    price: 21900000,
    image:
      'https://images.unsplash.com/photo-1582582621959-48d27397dc69?auto=format&fit=crop&w=1000&q=80',
    desc: 'Đá nung kết vân mây, ngăn kéo ray âm giảm chấn cao cấp.'
  }
];

const categories = ['Tất cả', ...new Set(products.map((p) => p.category))];
let currentFilter = 'Tất cả';
const cart = [];

const productsEl = document.getElementById('products');
const filtersEl = document.getElementById('filters');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const cartCountEl = document.getElementById('cartCount');
const cartPanelEl = document.getElementById('cartPanel');

const vnd = new Intl.NumberFormat('vi-VN');

function renderFilters() {
  filtersEl.innerHTML = categories
    .map(
      (cat) =>
        `<button class="${cat === currentFilter ? 'active' : ''}" data-filter="${cat}">${cat}</button>`
    )
    .join('');

  filtersEl.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.filter;
      renderFilters();
      renderProducts();
    });
  });
}

function renderProducts() {
  const filtered =
    currentFilter === 'Tất cả'
      ? products
      : products.filter((product) => product.category === currentFilter);

  productsEl.innerHTML = filtered
    .map(
      (product) => `
      <article class="product">
        <img src="${product.image}" alt="${product.name}" />
        <div class="content">
          <span>${product.category}</span>
          <h3>${product.name}</h3>
          <p>${product.desc}</p>
          <div class="price-row">
            <strong>${vnd.format(product.price)}đ</strong>
            <button class="btn primary" data-id="${product.id}">Thêm</button>
          </div>
        </div>
      </article>
    `
    )
    .join('');

  productsEl.querySelectorAll('[data-id]').forEach((button) => {
    button.addEventListener('click', () => addToCart(Number(button.dataset.id)));
  });
}

function addToCart(id) {
  const found = products.find((item) => item.id === id);
  if (!found) return;

  cart.push(found);
  renderCart();
  cartPanelEl.classList.add('open');
  cartPanelEl.setAttribute('aria-hidden', 'false');
}

function renderCart() {
  cartItemsEl.innerHTML = cart.length
    ? cart
        .map((item) => `<li>${item.name} - ${vnd.format(item.price)}đ</li>`)
        .join('')
    : '<li>Giỏ hàng đang trống.</li>';

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotalEl.textContent = `${vnd.format(total)}đ`;
  cartCountEl.textContent = cart.length;
}

document.getElementById('cartBtn').addEventListener('click', () => {
  cartPanelEl.classList.toggle('open');
  const hidden = cartPanelEl.classList.contains('open') ? 'false' : 'true';
  cartPanelEl.setAttribute('aria-hidden', hidden);
});

document.getElementById('closeCart').addEventListener('click', () => {
  cartPanelEl.classList.remove('open');
  cartPanelEl.setAttribute('aria-hidden', 'true');
});

renderFilters();
renderProducts();
renderCart();
