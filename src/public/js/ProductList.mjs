import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
      <img src="${product.Image}" alt="Image of ${product.Name}">
      <h2 class="card__brand">${product.Brand}</h2>
      <h3 class="card__name">${product.Name}</h3>
      <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
    </a>
  </li>`;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;
    }
  
    async init() {
      try {
        const products = await this.dataSource.getData();
        if (products.length === 0) {
          this.showEmptyMessage();
        } else {
          this.renderList(products);
        }
      } catch (err) {
        console.error('ProductList error:', err);
        this.showError();
      }
    }
  
    renderList(products) {
      renderListWithTemplate(productCardTemplate, this.listElement, products, 'afterbegin', true);
    }
  
    showEmptyMessage() {
      this.listElement.innerHTML = `
        <div class="empty-message">
          <p>No products found in this category.</p>
        </div>
      `;
    }
  
    showError() {
      this.listElement.innerHTML = `
        <div class="error-message">
          <p>Failed to load products. Please try again later.</p>
        </div>
      `;
    }
  }