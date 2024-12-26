/**
 * Bridge Pattern: (Abstraction-Implementation Pattern)
 *  It is a structural design pattern that lets us split complex classes or set of closely related classes
 *  into two seperate hierarchies-"abstractions" and "implementations" - which can be developed independently of each other.
 *
 *
 * ex. Shape -> Circle, Reactanle -> Red, Blue
 *
 *                              Shape
 *                                |
 *          ----------------------------------------------------
 *          |                   |               |               |
 *    Red Rectangle     Blue Rectangle      Red Circle      Blue Circle
 *
 * as we can we if we go about creating sub-class it will go exponentially.
 * i.e when we want to have changes in perticular direction i.e Red and Blue instead of having multiple child
 *      we can opt for Bridge Pattern.
 *
 *
 * IMP: Pattern Suggest that if we are trying to extend class in a independant direction, we can extract out
 *      that part and create new interface for that, so both will be developed independatly and simplify the
 *      complex of a large Monolith Class.
 *
 *      This Pattern solves the problem by switching from inheritance to the object composition.
 *
 * Abstraction & Implementations:
 *      1. Abstraction class (i.e Shape)(also called interface) is supposed to be a high-level control layer for some entity.
 *      2. And this layer isn't supposed to do any real work on its own.
 *      3. It should delegate the work to the Implementation layer(also called platform)
 *
 *
 * When talking about real application, the abstraction can be represented by a graphical user interface(GUI) and
 *  the implementation could be underlying operating system code(API) which GUI layer calls in response to user
 *  interactions.
 *
 *
 * APPLICATIONS:
 *  1. Use the Bridge Pattern when we want to divide and organise a monolith class that has several
 *      variants of some functionality(ex. class can work with various database servers).
 *
 *  2. Use the pattern when you need to extend a class in several orthogonal (independant) directions.
 *      The bridge suggest that you extract a seperate class hierarchy for each of the dimensions. The original
 *      class delegates the related work to the objects belonging to those hierarchies instead of doing everything
 *          by its own.
 *
 *  3. Use the Bridge if you need to be able to switch implementation at runtime.
 *      this is optional in Bridge pattern. and this is the reason many people confuse betweeen Bridge and Stratergy
 *
 *
 * NOTE:
 *  1. Pattern is not about how code is structured
 *  2. Its more about the intention behind the code and problem being addressed.
 *
 *
 * How to Implement:
 *  1. Identify the orthogonal dimention in you classes.
 *  2. See what operations the client need and define those in abstraction class.
 *  3. Determine the operations available on all platforms. Declare the one that abstraction needs in general implementation.
 *  4. For all platforms in your domain create concrete implementation classes, but make sure they all follow implementations interface.
 *  5. Inside the abstract class, add reference field for the implementation type. The abstract delegate most of its work to implementations
 *  6. If you have several variant of abstract class those can be implemented by extending base abstract class.
 *  7. The client code should pass the implementation class to the abstract class.
 *
 *
 * PROS:
 *  1. You can create platform-independant classes and apps.
 *  2. The client code works with high-level abstractions. It isn't exposed to platform details.
 *  3. Open/Close principle, you introduce new abstarctions and implementations.
 *  4. Single responsibilty principle. You can focus on high-level logic in the abstraction and on platform details in
 *      the implementations.
 *
 *
 * CONS:
 *  1. In case of highly cohesive class code might get complicated.
 *
 * Relations:
 *  1. Bridge might look similar to Strategy in terms of code structure but patterns are more about intentions
 *      and problem that is being focused and not the code structure.
 *  2. can be use along with abstract factory to free client code from the implementations details of abstract class.
 *
 */

interface Implementation {
  subProcess(): string;
}

class AbstractClass {
  constructor(protected implementation: Implementation) {}

  public operation() {
    let str = this.implementation.subProcess();
    console.log(`Done processing ${str}`);
  }
}

class ExtendAbstract extends AbstractClass {
  public operation(): void {
    let str = this.implementation.subProcess();
    console.log(`ExtendedAbstract done processing ${str}`);
  }
}

class ConcreteImplementationA implements Implementation {
  subProcess(): string {
    return "ConcereteImplementationA sub process";
  }
}

class ConcreteImplementationB implements Implementation {
  subProcess(): string {
    return "ConcereteImplementationB sub process";
  }
}

function clientCode(abstraction: AbstractClass) {
  abstraction.operation();
}

const imple = new ConcreteImplementationA();
const abstr = new AbstractClass(imple);

clientCode(abstr);

const implb = new ConcreteImplementationB();
const abstrEx = new ExtendAbstract(implb);

clientCode(abstrEx);
