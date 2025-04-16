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

  /**
   * Renders a list using a template function
   * @param {Function} templateFn - Function to generate HTML from each item
   * @param {HTMLElement} parentElement - The element to insert HTML into
   * @param {Array} list - The list of items to render
   * @param {string} position - Position to insert HTML (default: "afterbegin")
   * @param {boolean} clear - Whether to clear the parent element first (default: false)
   */
  export function renderListWithTemplate(
    templateFn,
    parentElement,
    list,
    position = "afterbegin",
    clear = false
  ) {
    if (clear) {
      parentElement.innerHTML = "";
    }
    const htmlStrings = list.map(templateFn);
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
  }

  export function renderWithTemplate(template, parentElement, data, callback) {
    parentElement.insertAdjacentHTML('afterbegin', template);
    if (callback) {
      callback(data);
    }
  }

  export async function loadTemplate(path) {
    const response = await fetch(path);
    const template = await response.text();
    return template;
  }

  export async function loadHeaderFooter() {
    const headerTemplate = await loadTemplate('/partials/header.html');
    const footerTemplate = await loadTemplate('/partials/footer.html');
    const headerElement = document.getElementById('main-header');
    const footerElement = document.getElementById('main-footer');
    
    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);
  }