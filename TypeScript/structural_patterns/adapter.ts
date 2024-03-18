/**
 * Adapter Pattern:
 * 
 * Defination: its a structural design pattern that allows objects with incompatible interfaces to collaborate.
 * 
 * It lets us create an intermediatory to communicate between two interfaces if they are not compatible with
 * each other.
 * 
 * EX: imagine we are are having stock market app and in which we want to intergrate 3rd party analytics
 *      library but issue is our existing system only communicates in XML and this new library works with   
 *      JSON data.
 * 
 * APPLICATION:
 *  1. It can be used when we want to use existing class but its interface isn't compatible with the rest
 *      of our code.
 * 
 *  2. Adapter pattern lets us create middle-layer class that servers as a translator between our code and
 *      a legacy class, a 3rd party class or any other class.
 * 
 *  3. This pattern can also be used when we have multiple sub-classes which lack a common functionality
 *      which cannot be added to the super-class.
 *          a. one possible way is to extend each sub-class and add new required functionality but
 *              this doesn't look like a clean code and this method smells really bad.
 *          b. another way, which is more elegant, is to put the missing functionality into an adaptor class.
 *              Then we would wrap object(of sub-class) with missing feature inside the adaptor class.This way
 *              we can add the dynamic feature.
 *          c. For this to work, Target class must have common interface, and adaptor's field(property) should follow
 *              that interface. this approach looks very similar to DECORATOR pattern.
 * 
 * How to Implement: 
 *  1. Make sure that we have at least two classes with incompatile interface.
 *      a. A usefule service class, which can't change(often 3rd party, legacy or with lot of dependancies).
 *      b. One or serveral client that would benefit from using the service class.
 * 
 *  2. Declare client interface and describe how clients communicates with the service.
 * 
 *  3. Create the adaptor class and make it follow the client interface. Leave all the methods empty for now.
 * 
 *  4. Add a field to a adaptor class to store a reference to the service object. The common practice is to
 *      initialize this field via the constructor, but sometimes it's more convenint to pass it to the adaptor
 *      when calling its method.
 * 
 *  5. One by one implement all methods of the client interface in the adaptor class. The adaptor should
 *      delegete most of the real work to the service object, handling only the interface or data format conversion.
 * 
 *  6. Client should use the adaptor via the client interface. This will let us change or extend the adaptor
 *      without affecting the client code.
 * 
 * for more (https://refactoring.guru/design-patterns/adapter)
 * 
 * PROS:
 *  1. SINGLE RESPONSIBILITY PRINCIPLE, we are seperating interface or data conversion code from the 
 *      primary business logic of program.
 *  2. Open/Close principle, we can introduce new types of adpators without doing any changes in the client code.
 *      as long as they work with the adatpro throught client interface.
 * 
 * CONS:
 *  1. The overall complexity of the code increases because we introduce the new set of interface and classes.
 *      Sometimes its just simple to just changes the service class so that it matches the rest of our code.
 * 
 * Identification: 
 *  Adapter pattern is recognized by the a constructor which takes an instance of a different abstract/interface type.
 *      When adaptor recieves a call to any of its methods, it translates parameters to the appropriate format and
 *      then directs the call to one or several methods of the wrapped object.
 * 
 * it focuses on the 3 questions:
 *  1. what classes does it consists of?
 *  2. what roles do these classes play?
 *  3. In what way elements of the pattern are related?
 * 
 * Guide: 
 *  1. suppose we have two classes, class A1 is a legacy class(or library) and B1 is a client class, as we can't make
 *      changes to the class A1 we can extend B1 and create Adaptor which accepts object of A1 as property in
 *      constructor and have all the method of B1 and modify those before making request to the A1 in those
 *      methods.
 * 
 */

class Target {
    public request(): string {
        return "Target class's default behaviour";
    }
}

class Adaptee {//3rd party library or legacy code which needs to be adapted by adaptor   

    public specificRequest(): string {
        return "Adaptee's specific request";
    }
}

class Adaptor extends Target {

    constructor(private adaptee: Adaptee) {
        super();
        this.adaptee = adaptee;
    }
    public request(): string {
        const result = this.adaptee.specificRequest().split("").reverse().join("");
        return `Adaptor class (Translated) ${result}`;
    }
}


function clientCode(target: Target) {
    console.log(target.request());
}

console.log("creating target: ");
const target = new Target();
clientCode(target);

console.log('new process.....');

const adaptee = new Adaptee();
console.log("making adaptee request: ", adaptee.specificRequest());

console.log('new process.....');

console.log("creating adaptor request");
const adaptor = new Adaptor(adaptee);
clientCode(adaptor);

export default {};