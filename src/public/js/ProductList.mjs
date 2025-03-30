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
      this.listElement.innerHTML = products
        .map(product => this.createProductCard(product))
        .join('');
    }
  
    createProductCard(product) {
      return `
        <li class="product-card">
          <a href="/product_pages/index.html?product=${product.Id}" class="product-card__link">
            <img src="${product.Image}" 
                 alt="${product.Name}" 
                 class="product-card__image"
                 loading="lazy">
            <div class="product-card__content">
              <h3 class="product-card__name">${product.Name}</h3>
              <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
              <p class="product-card__brand">${product.Brand}</p>
            </div>
          </a>
        </li>
      `;
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