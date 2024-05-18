class Heart extends AnimatedObject {
    fillFactor = 0.5;


    // jsdoc
    constructor(x, y) {
        super(source.heart, x, y);
    }


    // jsdoc
    triggerEffect() {
        let newMax = this.getNewMax();
        this.restore(newMax);
    }
}