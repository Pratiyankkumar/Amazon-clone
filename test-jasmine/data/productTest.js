import { Product } from "../../data/products.js";
import { Clothing } from "../../data/products.js";
import { Appliance } from "../../data/products.js";

const product1 = new Product({
  id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  image: "images/products/athletic-cotton-socks-6-pairs.jpg",
  name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
  rating: {
    stars: 4.5,
    count: 87
  },
  priceCents: 1090,
  keywords: [
    "socks",
    "sports",
    "apparel"
  ]
})

const product2 = new Clothing({
  id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
  image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
  name: "Adults Plain Cotton T-Shirt - 2 Pack",
  rating: {
    stars: 4.5,
    count: 56
  },
  priceCents: 799,
  keywords: [
    "tshirts",
    "apparel",
    "mens"
  ],
  type: "clothing",
  sizeChartLink: "images/clothing-size-chart.png"
})

const product3 = new Appliance({
  id: "54e0eccd-8f36-462b-b68a-8182611d9add",
  image: "images/products/black-2-slot-toaster.jpg",
  name: "2 Slot Toaster - Black",
  rating: {
    stars: 5,
    count: 2197
  },
  priceCents: 1899,
  keywords: [
    "toaster",
    "kitchen",
    "appliances"
  ],
  type: 'appliance',
  instructionsLink: 'supersimple.dev/images/appliance-instructions.png',
  warrantyLink: 'supersimple.dev/images/appliance-warranty.png'
})

describe('test suite: Products class', () => {
  it('check the price in cents', () => {
    expect(product1.priceCents).toEqual(1090);
  })
  it('checks the extraInfoHTML()', () => {
    expect(product1.extraInfoHTML()).toEqual('');
  })
  it('check the cents to dollar converter function', () => {
    expect(product1.getPrice()).toEqual('$10.90');
  })
  it('check the stars URL', () => {
    expect(product1.getStarsUrl()).toEqual('images/ratings/rating-45.png')
  })
})

describe('test suite : clothing Class', () => {
  it('check the price in cents', () => {
    expect(product2.priceCents).toEqual(799);
  })
  it('checks the extraInfoHTML()', () => {
    expect(product2.extraInfoHTML()).toContain('images/clothing-size-chart.png');
  })
  it('check the cents to dollar converter function', () => {
    expect(product2.getPrice()).toEqual('$7.99');
  })
  it('check the stars URL', () => {
    expect(product2.getStarsUrl()).toEqual('images/ratings/rating-45.png')
  })
  it('check the sizeChartLink', () => {
    expect(product2.sizeChartLink).toEqual('images/clothing-size-chart.png')
  })
})

describe('test suite: appliances class', () => {
  it('check the price in cents', () => {
    expect(product3.priceCents).toEqual(1899);
  })
  it('checks the extraInfoHTML()', () => {
    expect(product3.extraInfoHTML()).toContain('../images/appliance-instructions.png');
  })
  it('check the cents to dollar converter function', () => {
    expect(product3.getPrice()).toEqual('$18.99');
  })
  it('check the stars URL', () => {
    expect(product3.getStarsUrl()).toEqual('images/ratings/rating-50.png')
  })
  it('checks the warranty link', () => {
    expect(product3.warrantyLink).toEqual('supersimple.dev/images/appliance-warranty.png');
  })
})