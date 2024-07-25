import { renderOrderSummary } from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {updateCartQuantity} from './checkout/orderSummary.js';
import { loadProducts } from '../data/products.js';
import { loadCart } from '../data/cart.js';
// import '../data/car.js'
// import '../data/cart-class.js';
// import '../data/backend-practice.js'


Promise.all([
  new Promise((resolve) => {
    loadProducts(() => {
      resolve('value1');
    });
  }), 
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })

]).then((values) => {
  console.log(values);
  updateCartQuantity();
  renderOrderSummary();
  renderPaymentSummary();
});


// new Promise((resolve) => {
//   loadProducts(() => {
//     resolve('value1');
//   });

// }).then((value) => {
//   console.log(value);

//   return new Promise((resolve) => {
//     loadCart(() => {
//       resolve();
//     });
//   });

// }).then(() => {
//   updateCartQuantity();
//   renderOrderSummary();
//   renderPaymentSummary();
// });


// loadProducts(() => {
//   loadCart(() => {
//     updateCartQuantity();
//     renderOrderSummary();
//     renderPaymentSummary();
//   });
// });


