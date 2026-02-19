const products = [
  {
    id: 1,
    name: 'Sofa Aurora Bọc Da Ý',
    description: 'Thiết kế cong mềm, da cao cấp, tông caramel sang trọng.',
    price: 35900000,
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    name: 'Bàn Ăn Marble Grande',
    description: 'Mặt đá tự nhiên kết hợp chân kim loại mạ titan.',
    price: 26900000,
    image:
      'https://images.unsplash.com/photo-1616594039964-3f334fa95f95?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    name: 'Giường Royal Walnut',
    description: 'Gỗ óc chó tuyển chọn, tích hợp hộc chứa tiện dụng.',
    price: 42800000,
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    name: 'Ghế Thư Giãn Velvet',
    description: 'Đệm nhung êm ái, thiết kế ergonomic cho đọc sách.',
    price: 12800000,
    image:
      'https://images.unsplash.com/photo-1616627561838-74f495117d7c?auto=format&fit=crop&w=900&q=80'
  }
];

const currency = (number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);

const productGrid = document.getElementById('productGrid');
const cartButton = document.getElementById('cartButton');
const cartDrawer = document.getElementById('cartDrawer');
const closeCart = document.getElementById('closeCart');
const cartCount = document.getElementById('cartCount');
const cartItemsElement = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');

let cart = [];

function renderProducts() {
  productGrid.innerHTML = products
    .map(
      (product) => `
      <article class="product-card">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        <div class="product-card-content">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="price-row">
            <strong>${currency(product.price)}</strong>
            <button class="add-btn" data-id="${product.id}">Thêm</button>
          </div>
        </div>
      </article>
    `
    )
    .join('');
}

function renderCart() {
  if (cart.length === 0) {
    cartItemsElement.innerHTML = '<li>Giỏ hàng đang trống.</li>';
  } else {
    cartItemsElement.innerHTML = cart
      .map((item) => `<li>${item.name} <br/><small>${currency(item.price)}</small></li>`)
      .join('');
  }

  cartCount.textContent = cart.length;
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotalElement.textContent = currency(total);
}

productGrid.addEventListener('click', (event) => {
  const button = event.target.closest('.add-btn');
  if (!button) {
    return;
  }

  const id = Number(button.dataset.id);
  const product = products.find((item) => item.id === id);
  if (!product) {
    return;
  }

  cart.push(product);
  renderCart();
});

cartButton.addEventListener('click', () => {
  cartDrawer.classList.add('open');
  cartDrawer.setAttribute('aria-hidden', 'false');
});

closeCart.addEventListener('click', () => {
  cartDrawer.classList.remove('open');
  cartDrawer.setAttribute('aria-hidden', 'true');
});

renderProducts();
renderCart();
