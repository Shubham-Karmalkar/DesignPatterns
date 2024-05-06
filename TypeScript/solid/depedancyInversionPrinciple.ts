/**
 * Class should depend on interface rather that concrete class
 */

class MacBook {
  private readonly keyboard: WiredKeyBoard;
  private readonly mouse: WiredMouse;
}
/**
 * here you can see MacBook dependens on Concrete class rather than interface so if in future
 * class got updated or we wante to have blutooth Keyboard we won't be able to do it.
 * we we can do like below
 */

class MacBookUpdated {
  private readonly keyboard: Keyboard;
  private readonly mouse: Mouse;
}
