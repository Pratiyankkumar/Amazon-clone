import { orders } from "../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {formatCurrency} from '../scripts/utils/money.js';
import { products } from "../backend/products.js";
import { addToCart } from "../data/cart.js";
import { updateCartQuantity } from "./amazon.js";

let orderId;
let orderedProduct;

loadPage();
updateCartQuantity();


console.log(orders);

function loadPage() {

  let orderSummaryHTML = '';

  orders.forEach((order,index) => {
    let orderDate = (order.orderTime).slice(0,10);
    let formatedDate = dayjs(orderDate).format('MMMM D');

    orderId = order.id;

    orderSummaryHTML += `
      <div class="order-container">
            
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${formatedDate}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${orderId}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${loadOrderDetails(order)}
        </div>
      </div>
    `;

  });

  document.querySelector('.js-orders-grid').innerHTML = orderSummaryHTML;

}


function getProductById(productId) {
  products.forEach((product,index) => {
    if (productId === product.id) {
      orderedProduct = product;
    }
  })

  return orderedProduct;
}


function loadOrderDetails(order) {
  
  let orderDetails = '';
  order.products.forEach((product) => {
    let orderDate = (product.estimatedDeliveryTime).slice(0,10);
    let formatedDate = dayjs(orderDate).format('MMMM D');
    getProductById(product.productId);

    orderDetails += `
      <div class="product-image-container">
          <img src="${orderedProduct.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${orderedProduct.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${formatedDate}
          </div>
          <div class="product-quantity">
            Quantity: ${product.quantity}
          </div>
          <button class="buy-again-button js-buy-again button-primary" data-product-id="${product.productId}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=123&productId=456">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
    `;
  })

  return orderDetails;
}

document.querySelectorAll('.js-buy-again')
  .forEach((button) => {
    button.addEventListener('click', () => {
      addToCart(button.dataset.productId, 1);
      window.location.reload();
    })
  })