import formatCurrency from "../scripts/utils/money.js";

export function getProduct(productId) {
  let matchingProduct;

    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });

  return matchingProduct;
}

export class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars*10}.png`
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`;
  }

  extraInfoHTML() {
    return '';
  }
}

export class Clothing extends Product{
  sizeChartLink;
  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    // super.extraInfoHTML();
    return `
      <a href="${this.sizeChartLink}" target="_blank">Size chart</a>
    `;
  }
}

export class Appliance extends Product {
  instructionsLink;
  warrantyLink;

  constructor(productDetails) {
    super(productDetails);
    this.instructionsLink = productDetails.instructionsLink;
    this.warrantyLink = productDetails.warrantyLink;
  }

  extraInfoHTML() {
    return `
      <a href="${this.instructionsLink}" target="_blank">Instructions</a>
      <a href="${this.warrantyLink}" target="_blank">Warranty</a>
    `;
  }
}

// const date = new Date();
// console.log(date)
// console.log(date.toLocaleTimeString());

// console.log(this);

// const object2 = {
//   a: 2,
//   b: this.a
// };

// function logThis() {
//   console.log(this);
// }
// logThis();
// logThis.call('hello');

// const object3 = {
//   method: () => {
//     console.log(this);
//   }
// };

// object3.method();

export let products = [];

export function loadProducts(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    products = JSON.parse(xhr.response).map((productDetails) => {
      if (productDetails.type === 'clothing') {
        return new Clothing(productDetails);
      } else if (productDetails.type === 'appliance') {
        return new Appliance(productDetails);
      }
      return new Product(productDetails);
    });

    console.log('load products');

    fun();
  })

  xhr.open('GET', 'https://gist.githubusercontent.com/Pratiyankkumar/aa73f739c9cf77e0bad8f7cb4609589f/raw/cd8dbe777e5b7b43111ddb87a4734dba34bc768f/products.json');
  xhr.send();
};

/*
export const products = .map((productDetails) => {
  if (productDetails.type === 'clothing') {
    return new Clothing(productDetails);
  } else if (productDetails.type === 'appliance') {
    return new Appliance(productDetails);
  }
  return new Product(productDetails);
});
*/