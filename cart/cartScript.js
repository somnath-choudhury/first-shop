const token = localStorage.getItem('token')
const user = JSON.parse(localStorage.getItem('loggedInUser'))

if (!token || !user) {
  alert(`Unauthorized access. Please login`)
  window.location.href = '/f3-project/index.html'
}

document.addEventListener('DOMContentLoaded', () => {
  let cartItems = JSON.parse(localStorage.getItem('cart')) || []
  console.log(cartItems);

  if (cartItems.length === 0) {
    const message = document.createElement('p')
    message.style.color = 'red';
    message.textContent = 'Cart is empty my dear...'
    message.style.fontSize = '20px'

    document.getElementById('cart-empty-message').appendChild(message)

    document.getElementById('checkout-button').disabled = true;
  }

  else {
    const productsContainer = document.getElementById('products')
    productsContainer.innerHTML = ``

  let i = 0;
  let totalSum = 0

  cartItems.forEach((item) => {
    const card = document.createElement('div')
    card.className = 'product-card';

    card.innerHTML += `
    <div class="product-image-wrapper">
        <img src="${item.image}" 
            alt="${item.title}" 
            class="product-image">
    </div>
    <div class="product-info">
        <h3 class="product-title">${item.title}</h3>
        <p class="product-price"><strong>$${item.price}</strong></p>
    </div>
    <div>
      <button class = 'remove-cart-btn'>Remove from cart</button>
    </div>
    `

    productsContainer.appendChild(card)

    const removeItemBtn = card.querySelector(".remove-cart-btn")
    removeItemBtn.addEventListener('click', () => {
      removeCart(item.id);
    });

    document.getElementById('cart-items').innerHTML += `
    <p>${++i}. ${item.title} <span>$${item.price}</span></p>
    `

    totalSum += item.price
  })

  document.getElementById('cart-total').innerHTML = `
    ${totalSum.toFixed(2)}
    `

  function removeCart(productId) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    cartItems = cartItems.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    location.reload()
  }

  document.getElementById('checkout-button').addEventListener('click', () => {
    window.location.href = '/f3-project/razorpay/razorpay.html'
  })
  }

  
  
})