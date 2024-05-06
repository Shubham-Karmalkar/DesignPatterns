/**
 * Sub-clas should extend the capabilities of parent class and not norrow it down
 *
 * i.e : If class B is subtype of class A, then we should be able to replace object of A and B without breaking
 *  the behaviour of the program
 *
 */

export interface Bike {
  turnOnEngine(): void;
  accelerate(): void;
}

class MotorCycle implements Bike {
  public engineOn: boolean;
  public speed: number;

  turnOnEngine(): void {
    this.engineOn = true;
  }

  accelerate(): void {
    this.speed += 10;
  }
}

class Bicycle implements Bike {
  public speed: number;

  turnOnEngine(): void {
    throw new Error("bike don't have engine");
  }

  accelerate(): void {
    this.speed += 10;
  }
}

function clientCode() {
  let vehicleList: Bike[] = [];
  vehicleList.push(new MotorCycle());
  vehicleList.push(new Bicycle());

  for (let vehicle of vehicleList) {
    console.log(vehicle.turnOnEngine()); // this will throw error
  }
}

/**
 * now as you can see above we are narrowing the down the properties of the interface
 * which should never happens as this will make program to behave very weirdly
 */

/**
 * then how to solve such issues from happening:
 *  1. in the parent class only put methods which are common for all
 *  2. then we can create difference child for this parent class which will act as parent class for other subclasses
 * for example see below:
 *
 */

class Vehicle {
  public getNumberOfWheels() {
    return 2;
  }
}

class EngineVehicle extends Vehicle {
  public hasEngine(): boolean {
    return true;
  }
}
class BicycleUpdated extends Vehicle {}

class Car extends EngineVehicle {}

class MotorCycleUpdated extends EngineVehicle {}

function newClientCode() {
  let vehicleList: Vehicle[] = [];

  vehicleList.push(new EngineVehicle());
  vehicleList.push(new BicycleUpdated());

  for (let vehicle of vehicleList) {
    console.log(vehicle.getNumberOfWheels());//only show methods we all the subclasses have
  }
}
