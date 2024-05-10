export const cart = [];


export function addToCart(productId,selectElementValue) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity+=selectElementValue;
  } else {
    cart.push({
      productId,
      quantity: selectElementValue
    });
  }
}