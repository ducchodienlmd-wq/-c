const products = [
  {
    name: "Sofa Verona 3 chỗ",
    price: "28.900.000đ",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Bàn ăn Milano",
    price: "19.400.000đ",
    image:
      "https://images.unsplash.com/photo-1617098474202-0d0d7f60b8ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Giường ngủ Aurora",
    price: "25.600.000đ",
    image:
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Đèn thả trần Crystal",
    price: "8.200.000đ",
    image:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80",
  },
];

const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");

function renderProducts(items) {
  productList.innerHTML = items
    .map(
      (item) => `
      <article class="product">
        <img src="${item.image}" alt="${item.name}" />
        <h3>${item.name}</h3>
        <div class="price">${item.price}</div>
        <button class="btn">Thêm vào giỏ</button>
      </article>
    `,
    )
    .join("");
}

searchInput.addEventListener("input", (event) => {
  const keyword = event.target.value.trim().toLowerCase();
  const filtered = products.filter((p) => p.name.toLowerCase().includes(keyword));
  renderProducts(filtered);
});

renderProducts(products);
