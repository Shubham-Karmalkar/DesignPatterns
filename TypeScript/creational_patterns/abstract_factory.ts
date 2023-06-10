/**
 * One Word Description:
 *  Abstract Factory specializes in crating families of related objects.
 * 
 * Defination:
 * This pattern solves the problem of creating entire product families without 
 * specifying their concrete class.
 * 
 * This pattern lets you produce familes of related objects without specifying their concrete
 * class.
 *
 * Application:
 * 1. You can use this when you have to work with various families of related products
 * 2. This is like one stop solution for multiple similar products instead of using 
 *      that products concrete class directly(which may lead to so much varity and leads to c
 *          complexity).
 * 3. Its a well design where each class is resposible for one thing.
 * 4. When a class deals with the multiple product types, it may be worth extracting its
 *      factory methods into a stand-alone factory class.
 * 
 * How to Implement:
 * 1. Map out a MATRIX of distinct products types versus variants of these products.
 * 2. Declare abstract products interface for all product types. Then make all concrete product
 *      classes implement these interfaces.
 * 3. Declare abstract factory interface with a set of creation methods for all abstrac
 *      products.
 * 4. Implement a set of concrete factory classes, one for each product variant.
 * 5. Create factory initialization code somewhere in the app. It should instantiate one of the
 *      concrete factory class, depending on the application configuration or the current 
 *      environment. Pass this factory object to all classes that construct products.
 * 6. Scan through the code and find all direct calls to product constructor. Replace them with
 *      with call to the appropriate creation method on the factory object.
 */

//Example.

/**
 * 
 *              Chair           Sofa            Coffee Table
 * Art Deco     artDecoChair    ArtDecoSofa     ArtDecoCoffeeTable
 * 
 * Vicotrian    VictorianChair  VictorianSofa   VictorianCoffeeTable
 * 
 * Modern       ModernChair     ModernSofa      ModernCoffeTable
 * 
 * 
 * when we come across above scenarion we will desing abstract factory pattern using the How to Implement steps given above.
 * 
 */

//Step 1.
interface Chair {
    sit():void;
}

interface Sofa {
    sit(): void;
}

interface CoffeeTable {
    sit():void;
}

class ArtDecoChair implements Chair {
    sit(): void {
        console.log("Sitting on Art Deco Chair");
    }
}

class VictorianChair implements Chair {
    sit(): void {
        console.log("Sitting on Victorian Chair");
    }
}


class ArtDecoSofa implements Sofa {
    sit(): void {
        console.log("Sitting on Art Deco Sofa");
    }
}

class VictorianSofa implements Sofa {
    sit(): void {
        console.log("Sitting on Victorian Sofa");
    }
}

interface AbstractFactory {
    createChair(): Chair
    createSofa(): Sofa
}

class ArtDecoFactory implements AbstractFactory {
    createChair(): Chair {
        return new ArtDecoChair();
    }

    createSofa(): Sofa {
        return new ArtDecoSofa();
    }
}

class VictoriaFactory implements AbstractFactory {
    createChair(): Chair {
        return new VictorianChair();
    }

    createSofa(): Sofa {
        return new VictorianSofa();
    }
}


function clientCode(factory: AbstractFactory) {
    const chair = factory.createChair();
    const sofa = factory.createSofa();

    chair.sit();
    sofa.sit();
}

console.log('Client testing with ArtDeco factory');

clientCode(new ArtDecoFactory());

console.log('Client testing with Victoria factory');

clientCode(new VictoriaFactory());