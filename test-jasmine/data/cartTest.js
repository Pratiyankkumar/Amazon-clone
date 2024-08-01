import { addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption} from "../../data/cart.js";

describe('test suite: addToCart', () => {

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    loadFromStorage();
  })
  it('adds an existing product to the cart', () => {
    
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });

    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
  });

  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });

    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
  })
});


describe('test suite: removeFromCart', () => {

  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
  
  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });

    loadFromStorage();
  })

  it('remove a product that is in the cart', () => {
    removeFromCart(productId1);
    expect(cart.length).toEqual(1);
    expect(cart[0].quantity).toEqual(1);
  });

  it('remove a product thats not in the cart', () => {
    removeFromCart('does not exits');
    expect(cart.length).toEqual(2);
  });
})

describe('test suite: updateDeliveryOption()', () => {

  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });

    loadFromStorage();
  })

  it('Update the delivery option of the product in the cart', () => {
    updateDeliveryOption(productId1,'3');
    expect(cart[0].deliveryOptionId).toEqual('3');
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: productId1,
      quantity: 2,
      deliveryOptionId: '3'
    }, {
      productId: productId2,
      quantity: 1,
      deliveryOptionId: '2'
    }]))
  })

  it('update the delivery option of the product that is not in the cart', () => {
    updateDeliveryOption('8c9c52b5-5a19-4bcb-a5d1-158a74287c53', '2')
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  })

  it('use a deliveryOptionId that does not exist', () => {
    updateDeliveryOption(productId1,'5');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    expect(cart.length).toEqual(2);
  })
})