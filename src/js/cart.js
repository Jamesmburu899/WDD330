import { loadHeaderFooter } from './utils.mjs';
import { getLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];
  const cartList = document.querySelector('.cart-list');
  const cartTotal = document.querySelector('.cart-total');
  
  if (cartItems.length === 0) {
    cartList.innerHTML = '<li class="cart-empty">Your cart is empty</li>';
    return;
  }

  cartList.innerHTML = cartItems
    .map(
      (item) => `<li class="cart-item">
        <img src="${item.Image}" alt="${item.Name}">
        <div class="cart-item-info">
          <h2>${item.Name}</h2>
          <p>$${item.FinalPrice.toFixed(2)}</p>
        </div>
      </li>`
    )
    .join('');

  const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
  loadHeaderFooter();
  renderCartContents();
});