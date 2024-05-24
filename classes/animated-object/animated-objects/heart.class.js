class Heart extends AnimatedObject {
    fillFactor = 0.5;


    // jsdoc
    constructor(x, y) {
        super(source.heart, x, y);
    }


    // jsdoc
    triggerEffect() {
        this.restoreHp();
    }
}