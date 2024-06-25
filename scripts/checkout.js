import {cart, removeFromCart} from '../data/cart.js';
import{products} from '../data/products.js';
import {formatCurrency} from '../scripts/utils/money.js';


// Initialize newValue properly
let newValue = JSON.parse(localStorage.getItem('value')) || '';

function saveToStorages() {
  // Update newValue with the latest data before saving
  localStorage.setItem('value', JSON.stringify(newValue));
}


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
                      Quantity: <span class="quantity-label current-quantity2-${matchingProduct.id} current-quantity">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link js-update-link2-${matchingProduct.id}" data-product-id = "${matchingProduct.id}">
                      Update
                    </span>
                      <input class="quantity-input visible js-quantity js-update-${matchingProduct.id} js-input-${matchingProduct.id}" data-product-id = "${matchingProduct.id}">
                      <span class="save-quantity-link link-primary visible js-update js-update-${matchingProduct.id}" data-product-id = "${matchingProduct.id}">Save</span>
                      
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

    document.querySelectorAll(`.js-update-${productId}`).forEach((button) => {
      button.classList.remove('visible')
    })

    document.querySelectorAll(`.js-update-link2-${productId}`)
      .forEach((button) => {
        button.classList.add('visible')
      })
    document.querySelectorAll(`.current-quantity2-${productId}`)
      .forEach((button) => {
        button.classList.add('visible')
      })

    

  })
});




document.querySelectorAll('.js-update')
  .forEach((button) => {

    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      console.log(productId);

      newValue = document.querySelector(`.js-input-${productId}`).value;
      console.log(newValue);
      saveToStorages();

      document.querySelectorAll(`.js-update-link2-${productId}`)
      .forEach((button) => {
        button.classList.remove('visible')
      })
    document.querySelectorAll(`.current-quantity2-${productId}`)
      .forEach((button) => {
        button.classList.remove('visible')
        button.innerHTML = Number(newValue);
      })

      document.querySelectorAll(`.js-update-${productId}`).forEach((button) => {
        button.classList.add('visible')
      })
    })
  })