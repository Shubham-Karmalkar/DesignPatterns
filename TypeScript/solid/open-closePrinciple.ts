/**
 * Open for Extension but closed for modification
 *
 * let consider example from previous about invoiceDao
 * now we want to add a new method to the invoiceDao
 * to save it in a file
 */

import { Invoice } from "./singleResponsibility";

export class InvoiceDao {
  constructor(public invoice: Invoice) {}

  public saveToDB(): void {}

  public saveToFile(): void {
    //newly added method
  }
}

/**
 * as you can see above we updated the already existing clas which was well tested and is already in production
 * which is very prone to bugs, which can be more accurately desinged as below
 */

interface IInvoiceDao {
  save(invoice: Invoice): void;
}

class DatabaseInvoiceDao implements IInvoiceDao {
  save(invoice: Invoice): void {
    //logic to save in db
  }
}

class FileInvoiceDao implements IInvoiceDao {
  save(invoice: Invoice): void {
    //logic to save in file
  }
}
