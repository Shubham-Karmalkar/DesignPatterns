/**
 * Singleton
 *
 * Defination:
 *  Sigleton design pattern is a creational design pattern that lets you ensure that class has only one instance.
 *  while providing the global access to that instance.
 * 
 * 
 * NOTE: It solves two problems, resulting in breaking SINGLE RESPONSIBILITY principle
 *      1. Ensure that class has just a single instance.
 *      2. Provide Global access point to that instance.
 * 
 * APPLICATION:
 *  1. When we want to have single instance of class, ex. when we have shared resource like Database or file to
 *      be accessed.
 *  2. Use Singleton pattern when we need strict control over global variables.
 * 
 * 
 * How to Implement:
 *  1. create the constructor of the class as private.
 *  2. create public static method getInstance which will return instance of class
 *  3. have a private static field to store the class instance
 *  4. write the logic in getInstance to either get existing or create and return instance.
 *  5. go to the client code and replace direct constructor call to the class with class's getInstance method.
 * 
 * 
 * PROS:
 *  1. we are sure that class has only one instance.
 *  2. we get global access to that instance.
 *  3. the singleton object is created/initialized only when its called/requested for the first time.
 * 
 * 
 * CONS:
 *  1. Violet the Single Responsibility Principle as pattern solve two problems at once.
 *  2. The Singleton pattern can mask bad design, for instance, when the components of the program know too much about each other.
 *      a. this happens a component directly using the class name to get the classes object instead of getting the object as param
 *  3. This pattern needs special treatment in multi-threaded environment so it won't create singleton object serveral times.
 *  4. It may be difficult to test client code of Singleton because many testing frameworks relies on the
 *      inheritance.
 * 
 * NOTE: A lot of developer believe that Singleton pattner is anti-pattern. That's why its useage is on the decline in Typescript Code.
 * 
 * Identification:
 *  its can be identified by private constructor and public static instance creation method.
 * 
 */

class SingleTon {
    private static instance: SingleTon;

    private constructor() {}

    public static getInstance() {
        if(!SingleTon.instance) SingleTon.instance = new SingleTon();

        return SingleTon.instance;    
    }
}

function clientCode() {
    const s1 = SingleTon.getInstance();
    const s2 = SingleTon.getInstance();

    if(s1 === s2) console.log("both are the same instance");
    if(s1 !== s2) console.log("both are not the same instance")
}

clientCode();
export default {}
