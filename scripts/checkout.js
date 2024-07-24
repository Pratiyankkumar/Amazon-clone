import { renderOrderSummary } from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {updateCartQuantity} from './checkout/orderSummary.js'
// import '../data/car.js'
// import '../data/cart-class.js';

import '../data/backend-practice.js'

updateCartQuantity();
renderOrderSummary();
renderPaymentSummary();
