/**
 * Defination:
 *  Factory method is a creational design pattern which solves the problem of creating objects
 *  without specifying their concrete class.
 *
 *  Factory method defines a method which should be used for creating objects instead of
 *  using a direct constructor call(new operator).Subclass can override this method to change
 *  the class of object that will be created.
 * 
 * NOTE: all the concrete classes returned by the Factory method must have same methods in those with 
 *      different implementation so that functionality will not break.
 * 
 * EX. if you have a game and it has character which has methods like play, kill, power up. and you have
 *      many characters in game like lizard, human, hulk etc. so we will create a method which will return
 *      us the differnt character if we provide just character name.
 * 
 * one thing to remember that creator class is already there from the begining and not specific of factory method   
 *  this class already has create method but only difference is the that method earlier has switch cases
 *  to fine the product to be created but now we are extending the new product creator method and removing the
 *  switch cases.
 *
 * APPLICATION: 
 *  1. it can be use in inital phases of the project where we don't know how many types of products we are going
 *      to have sometimes later it progresses into ABSTRACT FACTORY pattern.
 *  2. where all the different products returned from the factory method must extend the same interface
 * 
 *  3. we can have multiple product in later phase without major changes in the client code.
 * 
 *  4. creating the different product is not the primary responsibility of creator class. it's one of many responsibilities
 * 
 *  
 * How to Implement: 
 *  1. Make all the products  follow the same interface. This interface should declare methods that makes
 *      sense in every product.
 *  
 *  2. Add an empty factory method inside the creator class. The return type of the method should match
 *      the common product interface.
 * 
 *  3. In the creator's code find all product constructors and replace them with factory method call, while
 *      extracting the product creation inside the factory method.
 *
 *  4. At this point of time factory method might have switch case and code might look ugly but we will
 *      create subclass from the creator interface/class.
 * 
 *  5. Create the concrete sub-class for each product and create the factory method. Override the factory method
 *      in the subclass.
 *  
 *  for more (https://refactoring.guru/design-patterns/factory-method)
 * 
 *  short diagram: 
 *              
 *          Creator                                                                 Product
 *             -> createProduct: Product                                                /\
 *             /                         \                                             /  \
 *     Product1Creator                  Product2Creator                         Product1   Product2
 *      -> createProduct: Product1       -> createProduct: Product2
 *
 * PROS:
 *  1. reduct tight coupling
 *  2. Single responsibily principle
 *  3. Open close principle, you don't need to update switch case everytime new product is introduced you 
 *      only extend new sub class.
 * 
 * CONS:
 *  1. code might have become more complex.
 * 
 * 
 */

abstract class Creator {

    public abstract factoryMethod(): Product;

    public someOperation() {
        const product = this.factoryMethod();
        console.log("Creator(): doing product Operation: ", product.operation());
    }
}

class ConcreteCreator1 extends Creator {
    public factoryMethod(): Product {
        return new Product1();
    }
}

class ConcreteCreator2 extends Creator {
    public factoryMethod(): Product {
        return new Product2();
    }
}

interface Product {
    operation():string;
}

class Product1 implements Product {
    public operation(): string {
        return "hello i am Product1";
    }
}

class Product2 implements Product {
    public operation(): string {
        return "hello i am Product2";
    }
}


function clientCode(creator: Creator) {
    console.log("inside the client code");
    creator.someOperation();
}

clientCode(new ConcreteCreator2());


export default {};
