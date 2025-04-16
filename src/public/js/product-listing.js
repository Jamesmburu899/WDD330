import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

const initializeProductListing = async () => {
  try {
    // Get the category from the URL parameter
    const category = getParam('category') || 'tents';

    const dataSource = new ProductData();
    const listElement = document.querySelector('.product-list');
    
    if (listElement) {
      const productList = new ProductList(category, dataSource, listElement);
      await productList.init();
    }
  } catch (err) {
    console.error('Product listing initialization failed:', err);
    document.querySelector('.product-list').innerHTML = `
      <div class="error-message">
        <p>Failed to load products. Please try again later.</p>
      </div>
    `;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  loadHeaderFooter();
  initializeProductListing();
});