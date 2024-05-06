/**
 * A class should have only one reason to change
 */

export class Marker {
  constructor(
    public name: string,
    public color: string,
    public year: number,
    public price: number
  ) {}
}

export class Invoice {
  constructor(public marker: Marker, public quantity: number) {}

  public calculatePrice(): number {
    let price = this.marker.price * this.quantity;
    return price;
  }

  public printInvoice(): void {
    //printing logic
  }

  public saveToDB(): void {
    //saving logic
  }
}

/**
 * as you can see above Invoice classes is having more that one responsibilities i.e.
 *  1. calculating price
 *  2. printing the invoice
 *  3. saving invoice to db
 *
 * so there are multiple reasons for Invoice class to change which should not be the case so
 * this can be modified as below
 */

class InvoiceUpdated {
  constructor(public marker: Marker, public quantity: number) {}

  public calculatePrice(): number {
    let price = this.marker.price * this.quantity;
    return price;
  }
}

class InvoiceDao {
    constructor(public invoice: InvoiceUpdated){}

    public save(): void {
        //saving logic
    }
}

class InvoicePrinter {
    constructor(public invoice: InvoiceUpdated) {}

    public print(): void {
        //printing logic
    }
}

/**
 * Now as you can see above each class is having its own responsibility which is now following 
 *  single reponsibility
 * now this became
 *      1. easy to maintain
 *      2. easy to understand
 */