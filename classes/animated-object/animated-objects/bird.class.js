class Bird extends AnimatedObject {


    // jsdoc
    constructor(x, y) {
        super(source.bird, x, y);
        this.setSpeed(32);
    }


    // jsdoc
    act() {
        this.floatPermanently();
    }
}