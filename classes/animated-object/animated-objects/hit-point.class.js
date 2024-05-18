class HitPoint extends AnimatedObject {


    // jsdoc
    constructor(x, y) {
        super(source.hitPoint, x, y);
    }


    // jsdoc
    get max() {
        return world.hpBar.max;
    }


    // jsdoc
    get hpPoints() {
        return world.hpBar.points.length;
    }


    // jsdoc
    triggerEffect() {
        let newMax = this.getNewMax();
        this.restore(newMax);
    }


    // jsdoc
    getNewMax() {
        let newMax = this.calculateNewMax();
        return getVerifiedValue(this.max, newMax);
    }


    // jsdoc
    calculateNewMax() {
        return this.hpPoints + this.max * 0.2
    }


    // jsdoc
    restore(newMax) {
        world.hpBar.fill(newMax);
    }
}