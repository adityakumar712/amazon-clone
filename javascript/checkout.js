import {renderOrderSummary} from '../javascript/checkout/ordersummary.js';
import {renderPaymentSummary} from './checkout/paymentsummary.js';
import {renderCheckoutHeader} from './checkout/checkoutHeader.js';
// import '../data/cart-class.js';
renderCheckoutHeader();
renderOrderSummary();
renderPaymentSummary();