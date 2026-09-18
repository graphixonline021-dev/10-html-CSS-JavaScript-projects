const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search-input");
const categoryButtons = document.getElementById("category-buttons");

let allProducts = [];
let currentCategory = "all";

const fetchProducts = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=100");
    const data = await response.json();
    allProducts = data.products;
    displayProducts(allProducts);
  } catch (error) {
    productList.innerHTML = `<p class="no-results">Failed to load products. Try again later.</p>`;
  }
};

const displayProducts = (products) => {
  if (products.length === 0) {
    productList.innerHTML = `<p class="no-results">No products found matching your search.</p>`;
    return;
  }

  productList.innerHTML = products
    .map(
      (product) => `
    <div class="product-card">
      <img src="${product.thumbnail}" alt="${product.title}">
      <h3 class="product-title">${product.title}</h3>
      <p class="product-price">$${product.price.toFixed(2)}</p>
      <span class="product-category">${product.category}</span>
    </div>
  `
    )
    .join("");
};

const filterProducts = () => {
  const searchTerm = searchInput.value.toLowerCase().trim();

  const filtered = allProducts.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm);
    const matchesCategory =
      currentCategory === "all" || product.category === currentCategory;

    return matchesSearch && matchesCategory;
  });

  displayProducts(filtered);
};

searchInput.addEventListener("input", filterProducts);

categoryButtons.addEventListener("click", (e) => {
  if (!e.target.classList.contains("btn")) return;

  document.querySelectorAll(".btn").forEach((btn) => btn.classList.remove("active"));
  e.target.classList.add("active");

  currentCategory = e.target.dataset.category;
  filterProducts();
});

fetchProducts();