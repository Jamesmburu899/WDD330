export function getParam(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
  }
  
  export function getLocalStorage(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  
  export function setLocalStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      console.error('Error writing to localStorage:', err);
    }
  }
  
  export function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  }