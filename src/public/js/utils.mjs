export function getParam(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
  }
  
  export function getLocalStorage(key) {
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch (err) {
      console.error('Error reading localStorage:', err);
      return [];
    }
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