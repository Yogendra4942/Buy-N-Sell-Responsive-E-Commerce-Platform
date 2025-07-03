const products = [
  { id: 1, name: "Used Laptop", price: 299.99, image: "https://sathya.in/media/95840/catalog/tuf003.jpg", rating: 4, category: "electronics" },
  { id: 2, name: "Smartphone", price: 199.99, image: "https://cdn1.smartprix.com/rx-ijrsGvn2I-w1200-h1200/jrsGvn2I.jpg", rating: 5, category: "electronics" },
  { id: 3, name: "Digital Camera", price: 149.99, image: "https://x.imastudent.com/content/0004905_sony-cybershot-dsc-rx10-mark-iv-digital-camera_500.jpeg", rating: 3, category: "electronics" },
  { id: 4, name: "Tablet", price: 249.99, image: "https://p3-ofp.static.pub/fes/cms/2023/02/22/5rhddw9d8vm9xfkexcwzvvi9lindg8985574.png", rating: 4, category: "electronics" },
  { id: 5, name: "Headphones", price: 49.99, image: "https://www.headphonezone.in/cdn/shop/products/Headphone-Zone-Sony-WH-CH720N-19.jpg?v=1679485347&width=2048", rating: 5, category: "accessories" },
  { id: 6, name: "Smartwatch", price: 99.99, image: "https://m.media-amazon.com/images/I/61ZjlBOp+rL.jpg", rating: 2, category: "electronics" },
];

let cart = [];

function createProductHTML(product) {
  return `
    <div class="col-md-4 col-sm-6 mb-4">
      <div class="card h-100 product-card shadow-sm">
        <img src="${product.image}" class="card-img-top" alt="${product.name}" loading="lazy">
        <div class="card-body text-center">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text text-danger fw-bold">$${product.price.toFixed(2)}</p>
          <div class="rating mb-2">${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}</div>
          <button class="btn btn-success" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      </div>
    </div>
  `;
}

function renderProducts(filteredProducts) {
  document.getElementById('product-list').innerHTML = filteredProducts.map(createProductHTML).join('');
  updateCartCount();
}

function filterProducts() {
  const searchQuery = document.getElementById('search').value.toLowerCase();
  const category = document.getElementById('category').value;
  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery);
    const matchesCategory = category === 'all' || p.category === category;
    return matchesSearch && matchesCategory;
  });
  renderProducts(filtered);
}

function sortProducts() {
  const sortValue = document.getElementById('sort').value;
  let sortedProducts = [...products];

  if (sortValue === 'priceLow') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortValue === 'priceHigh') {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  renderProducts(sortedProducts);
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  cart.push(product);
  updateCartCount();
  alert(`${product.name} has been added to your cart!`);
}

function updateCartCount() {
  document.getElementById('cart-button').innerText = `Cart (${cart.length})`;
}

function addNewProduct() {
  const name = document.getElementById('product-name').value.trim();
  const price = parseFloat(document.getElementById('product-price').value);
  const image = document.getElementById('product-image').value.trim();
  const rating = parseInt(document.getElementById('product-rating').value);
  const category = document.getElementById('product-category').value;

  if (!name || isNaN(price) || !image || isNaN(rating)) {
    alert("Please fill all fields correctly.");
    return;
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price,
    image,
    rating,
    category
  };

  products.push(newProduct);
  clearSellForm();
  renderProducts(products);
}

function clearSellForm() {
  document.getElementById('product-name').value = '';
  document.getElementById('product-price').value = '';
  document.getElementById('product-image').value = '';
  document.getElementById('product-rating').value = '';
}

document.getElementById('search').addEventListener('input', filterProducts);
document.getElementById('sort').addEventListener('change', () => {
  sortProducts();
  filterProducts();
});
document.getElementById('category').addEventListener('change', filterProducts);
document.getElementById('sell-button').addEventListener('click', addNewProduct);

// Initial render
renderProducts(products);
