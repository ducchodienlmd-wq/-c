const products = [
  { name: 'Sofa Aurora Ý', price: '24.900.000đ', type: 'sofa', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80' },
  { name: 'Bàn trà Marble Gold', price: '8.490.000đ', type: 'table', image: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?auto=format&fit=crop&w=800&q=80' },
  { name: 'Ghế đơn Monaco', price: '6.200.000đ', type: 'chair', image: 'https://images.unsplash.com/photo-1596162954151-cdcb4c0f70a8?auto=format&fit=crop&w=800&q=80' },
  { name: 'Sofa góc Lumière', price: '31.500.000đ', type: 'sofa', image: 'https://images.unsplash.com/photo-1582582429416-1f2f6d4a2c2e?auto=format&fit=crop&w=800&q=80' },
  { name: 'Bàn ăn Walnut 6 ghế', price: '27.800.000đ', type: 'table', image: 'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?auto=format&fit=crop&w=800&q=80' },
  { name: 'Ghế bar Velvet', price: '3.900.000đ', type: 'chair', image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80' },
  { name: 'Tủ kệ TV Prisme', price: '12.400.000đ', type: 'table', image: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=800&q=80' },
  { name: 'Ghế thư giãn Luna', price: '9.990.000đ', type: 'chair', image: 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=800&q=80' }
];

const grid = document.getElementById('productsGrid');
const chips = document.querySelectorAll('.chip');

function renderProducts(filter = 'all') {
  const list = filter === 'all' ? products : products.filter(p => p.type === filter);
  grid.innerHTML = list
    .map(
      p => `
        <article class="product-card">
          <img src="${p.image}" alt="${p.name}" />
          <h3>${p.name}</h3>
          <div class="price-row">
            <span class="price">${p.price}</span>
            <button class="btn btn-outline">Mua</button>
          </div>
        </article>
      `
    )
    .join('');
}

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    renderProducts(chip.dataset.filter);
  });
});

renderProducts();
