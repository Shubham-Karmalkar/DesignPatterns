/**
 * interfaces should be such, that client should not be needed to implement unnecessary functions which
 *  they will not need
 */

interface RestuarantEmployee {
  washDishes(): void;
  serveCustomer(): void;
  cookFood(): void;
}

class Waiter implements RestuarantEmployee {
  washDishes(): void {
    throw new Error("Method not implemented.");
  }
  serveCustomer(): void {
    throw new Error("Method not implemented.");
  }
  cookFood(): void {
    throw new Error("Method not implemented.");
  }
}

/**
 * As you can see above Waiter don't cook still it had to implement cook method which is not correct
 *
 * this mean we should seperate interface in such a way it shouldn't have to implement unnecessary methods
 * i.e we can seperate interface in two as many such types as required.
 */

interface WaiterInterface {
  serveCustomer(): void;
  washDishes(): void;
}

interface ChefInterface {
  cookFood(): void;
  decideMenu(): void;
}
