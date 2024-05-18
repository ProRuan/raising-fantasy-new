class HitPoint extends AnimatedObject {


    // jsdoc
    constructor(x, y) {
        super(source.hitPoint, x, y);
    }


    // jsdoc
    get name() {
        return world.hpBar.name;
    }


    // jsdoc
    get max() {
        return world.hpBar.max;
    }


    // jsdoc
    get hpPoints() {
        return world.hpBar.points.length;
    }


    triggerEffect() {
        let newMax = this.getNewMax();
        this.restorHp(newMax);

        console.log(this.name, this.hpPoints, this.max);
    }


    getNewMax() {
        let newMax = this.hpPoints + this.max * 0.2;
        return (isLarger(this.max, newMax)) ? this.max : newMax;
    }


    restorHp(newMax) {
        for (let i = this.hpPoints; i < newMax; i++) {
            world.hpBar.addNewPoint();
            console.log(this.hpPoints);
        }
    }
}