import { loadHeaderFooter } from './utils.mjs';
import { getLocalStorage } from './utils.mjs';

function displayOrderSummary() {
  const cartItems = getLocalStorage('so-cart') || [];
  const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
  
  // Add order summary if not already present
  if (!document.querySelector('.order-summary')) {
    const summary = document.createElement('div');
    summary.className = 'order-summary';
    summary.innerHTML = `
      <h3>Order Summary</h3>
      <p>Total Items: ${cartItems.length}</p>
      <p>Total: $${total.toFixed(2)}</p>
    `;
    document.querySelector('.checkout').insertBefore(
      summary,
      document.querySelector('form')
    );
  }
}

function setupCheckoutForm() {
  const form = document.querySelector('form[name="checkout"]');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add checkout processing logic here
    alert('Order submitted successfully!');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadHeaderFooter();
  displayOrderSummary();
  setupCheckoutForm();
});