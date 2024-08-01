import { renderOrderSummary } from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {updateCartQuantity} from './checkout/orderSummary.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';
import { loadCart, loadCartFetch } from '../data/cart.js';
// import '../data/car.js'
// import '../data/cart-class.js';
// import '../data/backend-practice.js'

async function loadPage() {

  try{
    // throw 'error1';

    await Promise.all([
      loadProductsFetch(),
      loadCartFetch()
    ])

    
    
  } catch (error) {
    console.log(`${error}, Please try again later.`);
  }

  updateCartQuantity();
  renderOrderSummary();
  renderPaymentSummary();

}

loadPage();


/*
Promise.all([
  loadProductsFetch(), 
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
*/


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


