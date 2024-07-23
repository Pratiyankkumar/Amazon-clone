class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen;

  constructor(brand, model) {
    this.#brand = brand;
    this.#model = model;
  }

  displayInfo() {
    console.log(`brand : ${this.#brand}, model: ${this.#model}, speed: ${this.speed}, trunkOpen : ${this.isTrunkOpen}`)
  }

  go() { 
    this.speed+=5
    if (this.speed > 200) {
      this.speed = 200;
    }
    if(this.isTrunkOpen === true) {
      this.speed = 0;
    }
  }

  break() {
    this.speed-=5;
  }

  openTrunk() {
    if (this.speed > 0) {
      this.isTrunkOpen = false;
    } else {
      this.isTrunkOpen = true;
    }
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }
}

class RaceCar extends Car {
  acceleration;


  constructor(brand, model, acceleration) {
    super(brand, model);
    this.acceleration = acceleration;
  }

  go() {
    this.speed += this.acceleration;
    if (this.speed > 300) {
      this.speed = 300;
    }
  }

  openTrunk() {
    this.isTrunkOpen = false;
  } 

  closeTrunk() {
    this.isTrunkOpen = false;
  }
}

const car1 = new Car('toyota', 'corolla');
car1.go();
car1.openTrunk();
car1.displayInfo();

const raceCar = new RaceCar('Mclaren', 'F1', 20);
raceCar.go()
raceCar.openTrunk();
raceCar.displayInfo();
console.log(raceCar);


console.log(car1);