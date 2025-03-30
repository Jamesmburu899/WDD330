import { getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

const initializeProductPage = async () => {
  try {
    const productId = getParam('product');
    if (!productId) throw new Error('No product ID specified');
    
    const dataSource = new ProductData('tents');
    const productDetails = new ProductDetails(productId, dataSource);
    await productDetails.init();
  } catch (err) {
    console.error('Product page initialization failed:', err);
    document.querySelector('main').innerHTML = `
      <div class="error-message">
        <h2>Error Loading Product</h2>
        <p>${err.message}</p>
        <a href="/" class="button">Return to Home</a>
      </div>
    `;
  }
};

document.addEventListener('DOMContentLoaded', initializeProductPage);