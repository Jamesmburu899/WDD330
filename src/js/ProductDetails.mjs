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
    const { Name, Brand, FinalPrice, Description, Images } = this.product;
    
    document.title = `${Name} | Sleep Outside`;
    document.getElementById('product-image').src = Images.PrimaryLarge;
    document.getElementById('product-image').alt = Name;
    document.getElementById('product-name').textContent = Name;
    document.getElementById('product-brand').textContent = Brand.Name;
    document.getElementById('product-price').textContent = `$${FinalPrice}`;
    document.getElementById('product-description').textContent = Description;
  }

  setupCart() {
    const cartButton = document.getElementById('add-to-cart');
    cartButton.addEventListener('click', () => {
      const cart = getLocalStorage('so-cart') || [];
      if (!cart.some(item => item.Id === this.product.Id)) {
        cart.push(this.product);
        setLocalStorage('so-cart', cart);
        
        // Update cart button state
        cartButton.textContent = 'Added to Cart!';
        cartButton.classList.add('added');
        
        // Update cart counter in header
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
          cartCount.textContent = cart.length;
          cartCount.classList.add('animate');
        }

        setTimeout(() => {
          cartButton.textContent = 'Add to Cart';
          cartButton.classList.remove('added');
          if (cartCount) cartCount.classList.remove('animate');
        }, 2000);
      } else {
        // Product already in cart feedback
        cartButton.textContent = 'Already in Cart';
        cartButton.classList.add('in-cart');
        setTimeout(() => {
          cartButton.textContent = 'Add to Cart';
          cartButton.classList.remove('in-cart');
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