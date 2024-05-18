class HitPoint extends AnimatedObject {
    fillFactor = 0.2;


    // jsdoc
    constructor(x, y) {
        super(source.hitPoint, x, y);
    }


    // jsdoc
    triggerEffect() {
        let newMax = this.getNewMax();
        this.restore(newMax);
    }
}