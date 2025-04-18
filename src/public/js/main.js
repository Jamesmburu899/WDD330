import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter } from './utils.mjs';

const initializeApp = async () => {
  try {
    const dataSource = new ProductData('tents');
    const listElement = document.querySelector('.product-list');
    
    if (listElement) {
      const productList = new ProductList('tents', dataSource, listElement);
      await productList.init();
    }
  } catch (err) {
    console.error('Application initialization failed:', err);
    document.querySelector('.product-list').innerHTML = `
      <div class="error-message">
        <p>Failed to initialize application. Please refresh the page.</p>
      </div>
    `;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  loadHeaderFooter();
  initializeApp();
});