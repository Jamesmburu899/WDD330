import { getLocalStorage } from './utils.mjs';

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }

    calculateItemSummary() {
        // calculate the total of all the items in the cart
        const summaryElement = document.querySelector(
            this.outputSelector + ' #cartTotal'
        );
        const itemNumElement = document.querySelector(
            this.outputSelector + ' #num-items'
        );
        itemNumElement.innerText = this.list.length;
        // calculate the total of all the items in the cart
        const amounts = this.list.map((item) => item.FinalPrice);
        this.itemTotal = amounts.reduce((sum, item) => sum + item);
        summaryElement.innerText = '$' + this.itemTotal;
    }

    calculateOrdertotal() {
        this.shipping = 10 + (this.list.length - 1) * 2;
        this.tax = (this.itemTotal * 0.06).toFixed(2);
        this.orderTotal = (
            parseFloat(this.itemTotal) +
            parseFloat(this.shipping) +
            parseFloat(this.tax)
        ).toFixed(2);
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        const shipping = document.querySelector(this.outputSelector + ' #shipping');
        const tax = document.querySelector(this.outputSelector + ' #tax');
        const orderTotal = document.querySelector(
            this.outputSelector + ' #orderTotal'
        );
        shipping.innerText = '$' + this.shipping;
        tax.innerText = '$' + this.tax;
        orderTotal.innerText = '$' + this.orderTotal;
    }

    packageItems() {
        return this.list.map((item) => ({
            id: item.Id,
            price: item.FinalPrice,
            name: item.Name,
            quantity: 1
        }));
    }

    async checkout(form) {
        if (!form.checkValidity()) {
            form.reportValidity();
            throw { name: 'ValidationError', message: 'Please fill in all required fields correctly.' };
        }

        const formDataToJSON = (formElement) => {
            const formData = new FormData(formElement);
            const convertedJSON = {};
            formData.forEach((value, key) => convertedJSON[key] = value);
            return convertedJSON;
        };

        const json = formDataToJSON(form);
        json.orderDate = new Date().toISOString();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = this.packageItems();
        
        try {
            const response = await services.checkout(json);
            return response;
        } catch (err) {
            let errorMessage = 'There was a problem processing your order.';
            if (err.message && typeof err.message === 'object') {
                errorMessage = Object.values(err.message).join('\n');
            }
            throw { name: 'CheckoutError', message: errorMessage };
        }
    }
}