/**
 * Represents a keyboard.
 */
class Keyboard {


    /**
     * Creates a keyboard.
     */
    constructor() {
        this.setConfirmationKeys();
        this.setArrowKeys();
        this.setLetterKeys();
    }


    /**
     * Sets the keys of confirmation.
     */
    setConfirmationKeys() {
        this.backspace = new Key('backspace', 8);
        this.enter = new Key('enter', 13);
        this.escape = new Key('escape', 27);
        this.space = new Key('space', 32);
    }


    /**
     * Sets the arrow keys.
     */
    setArrowKeys() {
        this.arrowLeft = new Key('arrowLeft', 37);
        this.arrowUp = new Key('arrowUp', 38);
        this.arrowRight = new Key('arrowRight', 39);
        this.arrowDown = new Key('arrowDown', 40);
    }


    /**
     * Sets the letter keys.
     */
    setLetterKeys() {
        this.keyA = new Key('keyA', 65);
        this.keyE = new Key('keyE', 69);
        this.keyF = new Key('keyF', 70);
        this.keyP = new Key('keyP', 80);
        this.keyQ = new Key('keyQ', 81);
        this.keyX = new Key('keyX', 88);
    }
}