export default class ProductData {
    constructor(category) {
      this.category = category;
      this.path = `/json/${category}.json`;
    }
  
    async getData() {
      const response = await fetch(this.path);
      if (!response.ok) throw new Error('Failed to fetch products');
      return await response.json();
    }
  
    async findProductById(id) {
      const products = await this.getData();
      return products.find(product => product.Id === id) || null;
    }
  }