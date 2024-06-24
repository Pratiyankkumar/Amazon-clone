import {cart, removeFromCart} from '../data/cart.js';
import{products} from '../data/products.js';
import {formatCurrency} from '../scripts/utils/money.js';

updateCartQuantity()

let cartSummaryHTML = '';
cart.forEach((cartItem) => {

  const productId = cartItem.productId;
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });


  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: Wednesday, June 15
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label current-quantity">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link" data-product-id = "${matchingProduct.id}">
                      Update
                    </span>
                      <input class="quantity-input update-quantity js-update-quantity">
                      <span class="save-quantity-link link-primary update-quantity js-update-quantity js-save-quantity">Save</span>
                      
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>

                  <div class="delivery-option">
                    <input type="radio" class="delivery-option-input"
                      name="delivery-option-${matchingProduct.id}">
                    <div>
                      <div class="delivery-option-date">
                        Tuesday, June 21
                      </div>
                      <div class="delivery-option-price">
                        FREE Shipping
                      </div>
                    </div>
                  </div>
                  <div class="delivery-option">
                    <input type="radio" checked class="delivery-option-input"
                      name="delivery-option-${matchingProduct.id}">
                    <div>
                      <div class="delivery-option-date">
                        Wednesday, June 15
                      </div>
                      <div class="delivery-option-price">
                        $4.99 - Shipping
                      </div>
                    </div>
                  </div>
                  <div class="delivery-option">
                    <input type="radio" class="delivery-option-input"
                      name="delivery-option-${matchingProduct.id}">
                    <div>
                      <div class="delivery-option-date">
                        Monday, June 13
                      </div>
                      <div class="delivery-option-price">
                        $9.99 - Shipping
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  `;
  
})

document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove()
      updateCartQuantity();
    });
  })




function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity+=cartItem.quantity;
  });

  document.querySelector('.itemcount').innerHTML = `
    Checkout (<a class="return-to-home-link"
    href="amazon.html">${cartQuantity} items</a>)
  `
}

document.querySelectorAll('.js-update-link').forEach((update) => {
  update.addEventListener('click', () => {
    const productId = update.dataset.productId;
    console.log(productId);
    document.querySelectorAll('.js-update-quantity')
      .forEach((button) => {
        button.classList.remove('update-quantity')
      })

    update.classList.add('update-quantity')

    document.querySelector('.current-quantity').classList.add('update-quantity')

    
  })
});

document.querySelectorAll('.js-save-quantity')
  .forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.js-update-quantity')
        .forEach(button => {
          button.classList.add('update-quantity')
        })
      
      document.querySelectorAll('.js-update-link')
        .forEach(button => {
          button.classList.remove('update-quantity')
        })
    })
  })
