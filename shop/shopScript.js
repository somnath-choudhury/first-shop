const token = localStorage.getItem('token')
const user = JSON.parse(localStorage.getItem('loggedInUser'))

if (!token || !user) {
  alert(`Unauthorized access. Please login`)
  window.location.href = '/f3-project/index.html'
}

document.getElementById('welcome-msg').innerHTML += `Welcome ${user.first} ${user.last},`

let allProducts = [];

async function getProducts() {
  const res = await fetch ('https://fakestoreapi.com/products')
  allProducts = await res.json()
  renderProducts(allProducts)
  console.log(allProducts);
}

function renderProducts(products) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const productsContainer = document.getElementById('products')
  productsContainer.innerHTML = ``

  products.forEach((product) => {
    const card = document.createElement('div')
    card.className = 'product-card'

    card.innerHTML = `
      <div class="product-image-wrapper">
        <img src="${product.image}" 
            alt="${product.title}" 
            class="product-image">
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.title}</h3>
        <p class="product-price"><strong>$${product.price}</strong></p>
        <p class="product-category">Category: ${product.category}</p>
        <p class="product-rating">⭐ ${product.rating.rate} / 5</p>
        <button class="add-to-cart">Add to Cart</button>
      </div>
`;

    const btn = card.querySelector('.add-to-cart');
    btn.addEventListener('click', () => {
      cart.push(product);                       
      localStorage.setItem('cart', JSON.stringify(cart)); 
      alert(`${product.title} added to cart!`); 
    });

    productsContainer.appendChild(card)

  })

}

document.getElementById('all-category').addEventListener('click', () => {
  renderProducts(allProducts)
})

document.getElementById('men-category').addEventListener('click', () => {
  const filtered = allProducts.filter(p => p.category === "men's clothing")
  renderProducts(filtered)
})

document.getElementById('women-category').addEventListener('click', () => {
  const filtered = allProducts.filter(p => p.category === "women's clothing")
  renderProducts(filtered)
})
document.getElementById('jewellery-category').addEventListener('click', () => {
  const filtered = allProducts.filter(p => p.category === "jewelery")
  renderProducts(filtered)
})
document.getElementById('electronics-category').addEventListener('click', () => {
  const filtered = allProducts.filter(p => p.category === "electronics")
  renderProducts(filtered)
})

getProducts()

const ratingRange = document.getElementById("rating-range");
const ratingValue = document.getElementById("rating-value");

ratingRange.addEventListener("input", () => {
  const minRating = parseFloat(ratingRange.value);
  ratingValue.textContent = minRating; // Update text
  const filtered = allProducts.filter(p => p.rating.rate >= minRating);
  renderProducts(filtered);
});

const priceCheckboxes = document.querySelectorAll('input[name="prange"]');

priceCheckboxes.forEach(cb => {
  cb.addEventListener("change", applyPriceFilter);
});

function applyPriceFilter() {
  const selectedRanges = [...priceCheckboxes]
    .filter(cb => cb.checked)
    .map(cb => cb.id);

  let filteredProducts = [];

  if (selectedRanges.length === 0) {
    renderProducts(allProducts);
    return;
  }

  filteredProducts = allProducts.filter(product => {
    const price = product.price;
    return selectedRanges.some(range => {
      if (range === "0-25") return price >= 0 && price <= 25;
      if (range === "25-50") return price > 25 && price <= 50;
      if (range === "50-100") return price > 50 && price <= 100;
      if (range === "100on") return price > 100;
    });
  });

  renderProducts(filteredProducts);
}


