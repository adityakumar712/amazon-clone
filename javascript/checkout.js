import {renderOrderSummary} from '../javascript/checkout/ordersummary.js';
import {renderPaymentSummary} from './checkout/paymentsummary.js';
import {renderCheckoutHeader} from './checkout/checkoutHeader.js';
// import '../data/cart-class.js';
// import '../data/car.js';
// import '../data/backend-practice.js';
import { loadProducts }  from '../data/products.js';

loadProducts(()=>{
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();

});
