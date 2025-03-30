import { getLocalStorage, setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = null;
  }

  async init() {
    try {
      this.product = await this.dataSource.findProductById(this.productId);
      if (!this.product) throw new Error('Product not found');
      this.render();
      this.setupCart();
    } catch (err) {
      console.error('ProductDetails error:', err);
      this.showError();
    }
  }

  render() {
    const { Name, Brand, FinalPrice, Description, Image } = this.product;
    
    document.title = `${Name} | Sleep Outside`;
    document.getElementById('product-image').src = Image;
    document.getElementById('product-image').alt = Name;
    document.getElementById('product-name').textContent = Name;
    document.getElementById('product-brand').textContent = Brand;
    document.getElementById('product-price').textContent = `$${FinalPrice.toFixed(2)}`;
    document.getElementById('product-description').textContent = Description;
  }

  setupCart() {
    const cartButton = document.getElementById('add-to-cart');
    cartButton.addEventListener('click', () => {
      const cart = getLocalStorage('so-cart') || [];
      if (!cart.some(item => item.Id === this.product.Id)) {
        cart.push(this.product);
        setLocalStorage('so-cart', cart);
        cartButton.textContent = 'Added to Cart!';
        setTimeout(() => {
          cartButton.textContent = 'Add to Cart';
        }, 2000);
      }
    });
  }

  showError() {
    document.querySelector('main').innerHTML = `
      <div class="error-message">
        <h2>Product Not Found</h2>
        <p>Sorry, we couldn't find the product you're looking for.</p>
        <a href="/" class="button">Return to Home</a>
      </div>
    `;
  }
}