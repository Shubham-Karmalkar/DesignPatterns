/**
 * Facade Pattern:(deceptive outward appearance)
 * 
 * Defination: this is a structural design pattern that provides simple interface to a library, a framework or
 *  any other complex set of classes.
 * 
 * When certain functionality in application depends on multiple sub-systems then we can create new interface
 *  out of it which will act as main head of functionality in which we will communicate with all the sub-system 
 *  and hide the all the sub-system/object required from the client and only will give access to this facade class.
 * 
 * NOTE: By the looks of it its pretty much clear that Facade class will provide less functinality and flexibility
 *      but it will hide ton's of unnecessary complexity from the client. And of any changes needed in any
 *      sub-system we only need to do changes in Facade class.
 *      (adapter wraps only one object while facade works with many object).
 * 
 * Diagram: 
 *          depends on         depends on
 * Client -----------> Facade -----------> Additional Facade
 *                       /|\
 *                      / | \  depends on
 *                     /  |  \
 *                 subSystem subSysmtem subSystem
 * 
 * Additional Facades are facades inside facade representing specific group of related object. This facade
 *  can also be used directly by client.
 * 
 * 
 * APPLICATION:
 *  1. Use the facade when we want to have limited but straight forward functionality to a sub-systems.
 *  
 *  2. Facade tries to stop the extra boiler plate code required at client side and provides shortcut for
 *      most used features by client.
 *  
 *  3. Use facade when we want to structure our sub-system into layers.
 *  
 *  4. let sub system layers of facade talk to each other through facade only. i.e for A Video Conversion Facade there
 *      will be two sub-Facade Video and Audio Facade let these facade communicate each other by facade methods only.
 *
 * 
 * How to Implement:
 *  1. Check if we can provide simpler interface for client than already existing sub-system provides.
 *      We are on the right track if this interface makes the client code independant from many sub-system classes.
 * 
 *  2. Declare and implement this interface in new Facade class. The facade should redirect all the calls from
 *      the client to appropriate objects of sub-system. The Facade should be responsible for initializing 
 *      sub-system and managing its further life cycle unless the client code already does this.
 * 
 *  3. To get full benefit from this pattern make the client code communicate with the sub-system only 
 *      through facade class. Now the client is protected from any changes in sub-system code. When sub-system
 *      get upgraded to new code we only has to do changes in one place.
 * 
 *  4. If the facade becomes too big consider extracting part of its behaviour to a new refined Facade class. 
 * 
 * 
 * PROS:
 *  1. we can isolate our code from the complexity of sub-system.
 * 
 * CONS:
 *  1. A facade can become a god object coupled to all classes of an app.
 * 
 */

/**
 * Facade works with multiple sub-system at the same time.
 */
class Facade {
    protected subSystem1: SubSystem1;
    protected subSystem2: SubSystem2;

    /**
     * Depending upon application needs either we can pass sub-system object or create in constructor
     */
    constructor(subSys1?: SubSystem1, subSys2?: SubSystem2 ){
        this.subSystem1 = subSys1 || new SubSystem1();
        this.subSystem2 = subSys2 || new SubSystem2();
    }

    /**
     * 
     * only provides limited features from the sub-system
     */
    public startWorking() {
        const operation1 = this.subSystem1.operation();
        const operation2 = this.subSystem2.operation();

        return operation1 + operation2;
    }
}

/**
 * Sub-systems aren't even aware about existance of Facade class and Facade is also like a client for 
 *  the sub-system classes.
 */
class SubSystem1 {
    public operation() {
        return 'doing operation from SubSystem1\n';
    }

    public operationN(){
        return 'doing N operation in SubSystem1\n';
    }
}

class SubSystem2 {
    public operation() {
        return 'doing operation from SubSystem2\n';
    }

    public operationZ() {
        return 'doing Z operations in SubSystem2\n';
    }
}

/**
 * Client code works with complex sub-system throught a simpler interface provided by Facade.
 * When facade manges the lifecycle of the sub-system then client isn't even aware about the existance
 * of sub-systems. This approach lets us keep the complexity under control.
 */
function clientCode(facade: Facade) {
    const result = facade.startWorking();

    console.log(result);
}

/**
 * Client code might already have the sub-systems some object already created. In this cases its better 
 *  to use these once instead of forcing Facade to create new objects.
 */

const subsystem1 = new SubSystem1()
const subsystem2 = new SubSystem2();

const facade = new Facade(subsystem1, subsystem2);

clientCode(facade);


export default {}