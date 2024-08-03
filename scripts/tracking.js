import { orders } from "../data/orders.js";
import { products } from "../backend/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { updateCartQuantity } from "./amazon.js";

let trackingProductDetails;
let trackingProduct;
let formatedDate;
let quantity;
let orderProgressPercentage;

loadTrackingPage();
updateCartQuantity();

setGreen();


function loadTrackingPage() {
  let trackingHTML = '';

  const url = new URL(window.location.href);
  let orderId = url.searchParams.get('orderId')
  let productId = url.searchParams.get('productId')

  getProductById(productId);
  getOrderById(orderId);
  console.log(trackingProductDetails, trackingProduct)

  getDeliveryDateAndQuantity(trackingProductDetails, productId)
  calculateOrderProgress(trackingProductDetails);

  trackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${formatedDate}
    </div>

    <div class="product-info">
      ${trackingProduct.name}
    </div>

    <div class="product-info">
      Quantity: ${quantity}
    </div>

    <img class="product-image" src="${trackingProduct.image}">

    <div class="progress-labels-container">
      <div class="progress-label js-label1">
        Preparing
      </div>
      <div class="progress-label js-label2">
        Shipped
      </div>
      <div class="progress-label js-label3">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar" style="width:${orderProgressPercentage}%;"></div>
    </div>
  `;

  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
}

function getProductById(productId) {
  products.forEach((product,index) => {
    if (productId === product.id) {
      trackingProduct = product;
    }
  })

  return trackingProduct;
}

function getDeliveryDateAndQuantity(order,productId) {
  order.products.forEach((product) => {
    if (product.productId === productId) {
      let orderDate = (product.estimatedDeliveryTime).slice(0,10);
      formatedDate = dayjs(orderDate).format('dddd, MMMM D');
      quantity = product.quantity;
    }
  })

  return formatedDate, quantity;
}

function getOrderById(orderId) {
  orders.forEach(order => {
    if (order.id === orderId) {
      trackingProductDetails = order;
    }

  })

  return trackingProductDetails;
}

function calculateOrderProgress(order) {
  let currentTime = Number(dayjs().format('D'));
  let orderTime = Number(dayjs(order.orderTime).format('D'));
  let deliveryTime = Number(dayjs(formatedDate).format('D'));

  let progress = ((currentTime - orderTime)/(deliveryTime - orderTime)) * 100;
  orderProgressPercentage = progress.toFixed(1);

  return orderProgressPercentage;
};

function setGreen() {
  if (orderProgressPercentage>=0 && orderProgressPercentage<50) {
    document.querySelector('.js-label1').classList.add('current-status')
    document.querySelector('.js-label2').classList.remove('current-status')
    document.querySelector('.js-label3').classList.remove('current-status')
  } else if (orderProgressPercentage>=50 && orderProgressPercentage<=99) {
    document.querySelector('.js-label1').classList.remove('current-status')
    document.querySelector('.js-label2').classList.add('current-status')
    document.querySelector('.js-label3').classList.remove('current-status')
  } else {
    document.querySelector('.js-label1').classList.remove('current-status')
    document.querySelector('.js-label2').classList.remove('current-status')
    document.querySelector('.js-label3').classList.add('current-status')
  }
}
