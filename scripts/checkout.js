import { renderOrderSummary } from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {updateCartQuantity} from './checkout/orderSummary.js'
// import '../data/cart-class.js';

updateCartQuantity();
renderOrderSummary();
renderPaymentSummary();
