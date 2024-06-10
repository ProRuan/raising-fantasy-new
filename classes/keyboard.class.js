class Keyboard {


    // jsdoc
    constructor() {
        this.setConfirmationKeys();
        this.setArrowKeys();
        this.setLetterKeys();
    }


    // jsdoc
    setConfirmationKeys() {
        this.backspace = new Key('backspace', 8);
        this.enter = new Key('enter', 13);
        this.escape = new Key('escape', 27);
        this.space = new Key('space', 32);
    }


    // jsdoc
    setArrowKeys() {
        this.arrowLeft = new Key('arrowLeft', 37);
        this.arrowUp = new Key('arrowUp', 38);
        this.arrowRight = new Key('arrowRight', 39);
        this.arrowDown = new Key('arrowDown', 40);
    }


    // jsdoc
    setLetterKeys() {
        this.keyA = new Key('keyA', 65);
        this.keyE = new Key('keyE', 69);
        this.keyF = new Key('keyF', 70);
        this.keyP = new Key('keyP', 80);
        this.keyQ = new Key('keyQ', 81);
        this.keyX = new Key('keyX', 88);
    }
}