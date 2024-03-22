/**
 * Observer Design Pattern(Event subscriber and listener)
 * 
 * Defination:
 *  This is behavioral design pattern which let us define the subscription mechanism which notifies the mulitiple object
 *      if any event has happened to the object they are observing.
 * 
 * Publisher as having some of its state also known as "Subject".
 * 
 * NOTE: if your app has many types of publishers and you want to make your subscribers compatible with
 *      all of them, you can go even further and make all publishers follow a common interface. This will allow
 *      subscribers to observe publishers states without depending upon publishers concrete class.
 * 
 * 
 * Diagram:
 *                                          depends on 
 *                  Publisher (Interface)  ------------------>   Subscriber (Interface)
 *                           |                                     +update(context)
 *                           |                                          |
 *                           |                                          |
 *                  Publisher Concrete class                     Concreted Subscriber
 *                      > subscribers: Subscriber[]                 +update(context)
 *                      > mainState
 * 
 *                      + subscribe(s: Subscribe)
 *                      + unSubscribe(s: Subscribe)
 *                      + notify()
 *                      + mainBussinessLogic()
 * 
 * a. so we will have 2 interface and 2 classes at least
 * b. client will create both the publisher and subscriber objects
 * c. any other class which want to give event functionality will have object of publisher in it which
 *      will take care of all the event handling.
 * 
 * 
 * APPLICATION:
 *  1. Use the Oberserver Pattern when changes in state of one object needs changes in another object and 
 *      actual set of objects is unknown beforeHand or changes dynamically.
 * 
 *  2. Use the pattern when some objects in your app must obeserve others, but only for limited time or
 *      in specific case.
 *      -> subscribers list is dynamic so subscribers can join or leave the list whenever they want.
 * 
 * How to Implement:
 *  1. Look over the business logic and try to break it down into two partns one Core Functionality, second Independant from other code
 *      Independant from other code will act as a publisher and rest will get converted to a subscriber class.
 *  
 *  2. Declare the Subscriber interface, and bare minimum it must have update method.
 * 
 *  3. Declare a Publisher Interface and describe a pair of methods for adding a subscriber and removing it
 *      from the list. Note: Publisher should work with the subscribers only via the Subscriber interface.
 * 
 *  4. Decide where to put the list and methods of a publisher. Usually, this code is same in all the publishers,
 *      so the obvious place to put the code is in a abstract class dervied directly from the publisher interface.
 *      Concrete Publisher class extends that class, inheriting the subscription behaviour.
 * 
 *      NOTE: However, if you are applying the pattern to existing class hierarchy, consider an approach
 *              based on composition: put the subscription logic into a seperate object and make all real publishers
 *              use it.
 * 
 *  5. Create concrete publisher class, if somthing happens inside this class it should notify all the subscribers.
 * 
 *  6. Implement the update methods in concrete subscriber classes. This method will recive some arguments
 *      from the publisher class like context of event. But there is another options that publisher can pass itself
 *      to the subscriber's update method as an argument and another way is like publisher to subscriber in
 *      constructor but this way is not that flexible.
 * 
 *  7. The client must create all the subscribers and register them with proper publishers. 
 * 
 * 
 * PROS:
 *  1. Open/close principle everytime we introduce new subscriber, we can add it without having to change
 *      publisher code.
 * 
 *  2. we can establish relation between objects at runtime.
 * 
 * 
 * CONS:
 *  1. Subscribers are notified in random order. 
 * 
 */

interface Publisher {
    attach(sub: Subscriber): void;
    detach(sub: Subscriber): void;
    notify():void;
}

class ConceretePublisher implements Publisher {
    public state:number;

    private list: Subscriber[] = [];

    attach(sub: Subscriber): void {
        if(this.list.includes(sub)) return console.log("Subscriber already exists");

        this.list.push(sub);
    }
    
    detach(sub: Subscriber): void {
        const index = this.list.indexOf(sub);
        
        if(index == -1) return console.log("Subscriber does not exists");

        this.list.splice(index, 1);
    }

    notify(): void {
        this.list.forEach(sub => sub.update(this));
    }

    public someBusinessLogic(): void {
        console.log('\nSubject: I\'m doing something important.');
        this.state = Math.floor(Math.random() * (10 + 1));

        console.log(`Subject: My state has just changed to: ${this.state}`);
        this.notify();
    }

    
}

interface Subscriber {
    update(context: Publisher): void;
}

class ConcreteSubscriber implements Subscriber {
    public update(context: Publisher):void {
        console.log("ConcreteSubscriber reacted to the event");
    }
}

class ConcreteSubscriber2 implements Subscriber {
    public update(context: Publisher):void {
        console.log("ConcreteSubscriber2 reacted to the event");
    }
}

const publisher = new ConceretePublisher();

const subscriber1 = new ConcreteSubscriber();
publisher.attach(subscriber1);

const subscriber2 = new ConcreteSubscriber2();
publisher.attach(subscriber2);

publisher.someBusinessLogic();
publisher.someBusinessLogic();

publisher.detach(subscriber2);

publisher.someBusinessLogic();
