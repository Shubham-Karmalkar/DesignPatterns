/**
 * Stratergy Pattern
 * 
 * Defination: It's a behavioral design pattern that lets us define family of algorithms, put each of 
 *  them into a different class, and make their objects interchangable(i.e having same interface).
 * 
 * IMP: Stratergy pattern suggests that if a class is doing a something specific in many different ways
 *      extract all of these algorithms into seperate classes classes stratergies.
 * 
 * EX. 1. imagine we are creating a app which will give user the most efficient path between two destinations,
 *      now we have a function for that called buildRoute but thing is we have many ways for this build route
 *      i.e Route for Cycle, Route for Bike, Route for Car, Route for public transport.
 * 
 *     2. One way is to create different different class of Navigator for each type like cycle, bike etc.
 *     
 *     3. But all these classes have only one thing in different i.e defination of buildRoute function.
 * 
 *     4. For such cases instead of creating sub classes its better to extract those stratergies into a
 *          different set of classes implementing same interface and having reference of this concrete stratergies
 *          into the Navigator class.
 *     
 *     5. Navigator will communicate with reference of Concrete Stragtergy class through its interface only.
 * 
 * APPLICATION: 
 *  1. Use stratergy pattern when we want to use different variants of a algorithm within an object and 
 *      be able to switch from one algorithm to another during run time.
 * 
 *  2. Use stratergy pattern when we have set of classes that only differ in the way they execute some
 *      behavior.
 * 
 *  3. Use stratergy pattern to isolate business logic of a class from the implementation details of 
 *      algorithms that may not be as important in the context of the logic.
 * 
 *  4. Use this pattern when class has massive conditional statements that switeches between different
 *      variations of algorithm.
 * 
 * How to implement:
 *  1. In the context class, identify a algorithm that is prone to frequent changes. It may also be 
 *      a massive conditional which select a different version of a algorithm at runtime.
 * 
 *  2. Declare stratergy interface for all the variations of a algorithm.
 * 
 *  3. One by one, extract all the algorithm into to their respective classes. They should all implement
 *      stratergy interface.
 * 
 *  4. In context class, create a filed as a reference to a stratergy object. Provide a setter for this
 *      reference field. The context should work with the reference object only through stratergy interface.
 *      The context may define an interface which let stratergy object access its data.
 * 
 *  5. Client of the context must associate it with a suitable stratergy that matches the way they expect
 *      the context to perform its primary job.
 * 
 * 
 * PROS:
 *  1. You can swap the algorithm used inside object at runtime.
 * 
 *  2. You can isolate implementation details of algorithm from the code that uses it.
 * 
 *  3. You can replace inheritance with the composition.
 * 
 *  4. Open/close principle we can extend to stratergies without any changes in the context class.
 * 
 * CONS:
 *  1. If you have only a couple of algorithms using stratergy pattern might increase complexity.
 * 
 *  2. Client must be aware of the differences between startergies to be able to select a proper one.
 */

interface RouteStratergy {
    execute(a:number, b:number):number;
}

class CycleStratergy implements RouteStratergy {
    execute(a:number, b:number): number {
        return a * b;
    }
}

class BikeStratergy implements RouteStratergy {
    execute(a: number, b: number): number {
        return a + b;
    }
}
/**
 * Every time we need change/addition in stratergy, extending class is complex and just having stratergy pattern
 * is simple and easy.
 */
class Navigator {
    private stratergy: RouteStratergy;

    public setStratergy(stratergy: RouteStratergy) {
        this.stratergy = stratergy;
    }

    public buildRoute(a: number, b:number) {
        return this.stratergy.execute(a,b);
    }

}

function client() {
    const cycleStr = new CycleStratergy();
    const bikeStr = new BikeStratergy();

    const navigator = new Navigator();

    const a = 22;
    const b = 12;

    navigator.setStratergy(cycleStr);
    console.log("cycle: ", navigator.buildRoute(a, b));

    navigator.setStratergy(bikeStr);
    console.log("bike: ",navigator.buildRoute(a,b));
}

client();

export default {};