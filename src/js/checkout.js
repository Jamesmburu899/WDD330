import { loadHeaderFooter, alertMessage } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

const services = new ExternalServices();
const checkout = new CheckoutProcess('so-cart', '.order-summary');

document.addEventListener('DOMContentLoaded', () => {
  loadHeaderFooter();
  checkout.init();

  // Calculate order total when zip code is entered
  document.querySelector('#zip').addEventListener('blur', () => {
    checkout.calculateOrdertotal();
  });

  // Handle form submission
  document.forms['checkout'].addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    try {
      await checkout.checkout(e.target);
      // Clear the cart and redirect to success page
      localStorage.removeItem('so-cart');
      location.href = '/cart/success.html';
    } catch (err) {
      console.error(err);
      submitButton.disabled = false;
      if (err.name === 'ValidationError') {
        // Form validation error - already handled by the browser
        return;
      }
      // Display specific error message from the server or a generic one
      alertMessage(err.message || 'There was an error processing your order. Please try again.', true);
    }
  });
});