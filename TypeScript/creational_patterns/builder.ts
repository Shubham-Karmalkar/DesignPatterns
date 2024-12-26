/**
 * Defination:
 *  This is a creational pattern which lets you construct complex objects step by step.
 *  Pattern allows you to produce different types and representations of an object using the 
 *  same construction code.
 * 
 * Applicability:
 *  1.Say you have a constructor with 10 optional parameters.
 *  2.When you want your code to be able to create different representation of some products
 *      (example. stone or wood house, or different types of house alone).
 *  3.When you want different varity of a product then instead of having multiple optional
 *      paremeters in your construction you can use this.
 * 
 * Problem Statement:
 *  Imagine that you are a house building company. In this different requirements come for 
 *  example someone want house with pool, someone want with garden, someone want garage etc.
 * 
 *  So how to do this, one way is to create a Base class and Extend it every time when 
 *  new feature comes but problem with this is you will end of huge no. of Subclasses.
 *  Another way is to have one class only and load the constructor with all the optional 
 *  fields.
 * 
 *  Or you can use Builder pattern.
 * 
 * General:
 *  1. Very First we can create a Builder interface which will have all the common steps 
 *      required to build the house as methods.
 *  2. Then we Can implement that interface depending upon the requirements for example
 *      suppose for houseBuilder interface we can create two Classes implementing it 
 *      one is StoneHouse another is CementHouse which will have all the steps same as 
 *      houseBuilder like add styles, make bath room, add pool etc.
 *  3. And all the Features are like method which we can call on the Object leading to 
 *      creating more diversity in houses exmple we can have Stone house with or without
 *      garden.
 *  4. On top of it we can have a Director class to direct most commonly use houses.
 *      For example we pass Builder Object to Director then director will run all the steps
 *      in "Order" which are required to create the house. Example for making the house 
 *      First we need to set the base/foundation and then on top we add pillers then slap etc.
 * 
 *  5. So basically directors job is to run the methods in the order.
 * 
 * Implementation:
 *  1. Make sure that you can clearly define the common construction steps for building all 
 *      available products representation. Otherwise, you won't be able to proceed with 
 *      implementing the pattern.
 *  2. Declare thse steps in Base Builder interface.
 *  3. Create a concrete builder class for each of the product representations and implement 
 *      their construction steps.
 *     Don't forget about implementing a method for fetching the result of construction.
 *  4. Think about creating a Director class. It may encapsulate various ways to construct 
 *      a product using the same builder objects.
 *  
 *  5. The client code creates both the Builder and the Director objects. Before construction 
 *      starts the client must pass a builder object to the director.
 * 
 *  6. The construction result can be obtained directly from the director only if all the
 *      products follow the same interface. Otherwise client should fetch the result from 
 *      the builder.
 * 
 * short digram: 
 *  BUILDER will have methods to build PRODUCT and BUILDER will return the PRODUCT once constructed
 *  for mostly used product type we will have Director which will have mostly use product creation methods.
 * 
 * for more (https://refactoring.guru/design-patterns/builder).
 * 
 * ex.
 * matrix: 
 *      varity        wantPool wantShower wantGarden
 *      wood House      Y/N         Y/N     Y/N
 *      stone House     Y/N         Y/N     Y/N
 *      cement House    Y/N         Y/N     Y/N
 * 
 * 
 * *******************
 * "KEY SIGN OF USEAGE": here each varity will either have a feature or not and dependeing on this we can many possibilities
 * *******************   then that is the candidatre for builder pattern
 *                       
 */

// Here "Concrete" meaning the class which will actually implement interface.

interface Builder {
    producePartA(): void;
    producePartB(): void;
    producePartC(): void;
}

class ConcreteBuilder1 implements Builder {
    private product: Product1;

    constructor() {
        this.reset();
    }

    //resetting builder is must as otherwise client has to create new builder everytime to create new product1 with different features
    public reset(): void {
        this.product = new Product1();
    }

    public producePartA(): void {
        this.product.parts.push('PartA1');
    }

    public producePartB(): void {
        this.product.parts.push('PartB1');
    }

    public producePartC(): void {
        this.product.parts.push('PartC1');
    }

    public getProduct(): Product1 {
        const result = this.product;
        this.reset();// here doing it manully you can explicity do it from client side
        return result;
    }
}


class Product1 {
    public parts: string[] = [];
    
    public listParts(): void {
        console.log(`Product parts: ${this.parts.join(', ')}\n`);
    }
}


class Director {
    private builder: Builder;

    public setBuilder(builder: Builder): void {
        this.builder = builder;
    }

    public buildeMinimalViableProduct(): void {
        this.builder.producePartA();
    }

    public buildFullFeatureProduct(): void {
        this.builder.producePartA();
        this.builder.producePartB();
        this.builder.producePartC();
    }
}


export function clientCode(director: Director){
    const builder = new ConcreteBuilder1();
    director.setBuilder(builder);

    console.log('standard basic product');
    director.buildeMinimalViableProduct();
    builder.getProduct().listParts();//here as you can see we are fetching data from the builder and not the director

    console.log('standard full feature product');

    director.buildFullFeatureProduct();
    builder.getProduct().listParts();

    console.log('custom product');
    builder.producePartA();
    builder.producePartC();

    builder.getProduct().listParts();
}

const director = new Director();
clientCode(director)