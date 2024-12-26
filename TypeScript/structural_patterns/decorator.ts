/**
 * Decorator Pattern:
 *  It is a structural pattern that lets you add addtional behaviour to a object by wrapping that object
 *  inside another object that contains the behaviour.
 *
 * APPLICATION:
 *  1. Use decorator pattern when you need to be able to assign extra behaviour to objects at runtime without breaking
 *      the code that uses these objects.
 *  2. Use the pattern when it's awkward or not possible to extend an object's behaviour using inheritance.
 *
 *
 * How to implement:
 *  1. Make sure you business domain can be represented as primary component with multiple optional layers around it.
 *  2. Figure out what methods are common to both the primary component and the optional layers. Create a component
 *      interfance and declare those methods there.
 *  3. Create concrete component class and define the base behaviour in it.
 *  4. Create a base decorator class. It should have a field to store wrapped object. The field should be declared with the
 *      component interface type to allow linking concrete component as well as decorators. The base decorator must delegate
 *      all work to the wrapped object.
 *  5. Make sure all the classes implement component interface
 *  6. Create concrete decorators by extending them from base decorator. A concrete decorator must execute it's task
 *      before or after the call to the parent method(which will delegate work to wrapped object).
 *  7. The clients should be responsible for creating decorators and composing them in the way client needs them.
 *
 * PROS:
 *  1. You can extend an object's behavior without making a new subclass
 *  2. You can add or remove responsibilities from an object at run time.
 *  3. You can combine several behaviours by wrapping an object into multiple decorators
 *  4. Single Responsibility Principle. you can divide monolithic class that implements many possible
 *      variants of behaviour into several small classes.
 *
 * CONS:
 *  1. Its hard to remove a specific wrapper from the wrapper stack.
 *  2. Its hard to implement a decorator in such a way that its behaviour doesn't depend on the order in the decorators
 *      are stacked.
 *  3. The initial configuration code of layers might look pretty ugly.
 *
 */

interface Datasource {
  readData(): void;
  writeData(): void;
}

class FileData implements Datasource {
  readData(): void {
    console.log("File data reading data");
  }

  writeData(): void {
    console.log("File data writing data");
  }
}

class DataDecorators implements Datasource {
  constructor(protected dataSource: Datasource) {}

  readData(): void {
    return this.dataSource.readData();
  }

  writeData(): void {
    return this.dataSource.writeData();
  }
}

class EncryptionDecorator extends DataDecorators {
  readData(): void {
    console.log("Encryption decorator reading data");
    return super.readData();
  }

  writeData(): void {
    console.log("Encryption Decorator writing data");
    return super.writeData();
  }
}

export function clientCode() {
  let baseObj = new FileData();
  baseObj = new EncryptionDecorator(baseObj);

  baseObj.readData();

  console.log("-----------------------------------------------------");

  baseObj.writeData();
}

clientCode();
