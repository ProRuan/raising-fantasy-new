class Lightning extends MagicObject {
    radDispl = 260;
    pages = { move: 2, collided: 8, epilog: 9 };
    chargeXY = { xLeft: 120, xCenter: 128, xRight: 136, yTop: 180, yCenter: 203, yBottom: 226 };
    lightningXY = { xLeft: 114, xCenter: 130, xRight: 146, yTop: 32, yCenter: 128, yBottom: 224 };
    deltaY = { move: 210, collided: 96 };
    delay = 1000;


    // jsdoc
    constructor(x, y, otherDirection) {
        super(source.lightning, x, y);
        this.setMagic(otherDirection, 40, 'lightning8');
        this.charge();
    }


    // jsdoc
    charge() {
        this.bodyXY = this.chargeXY;
        this.targetingStop = getTime() + this.delay;
        this.chargingStop = getTime() + 2 * this.delay;
    }


    // jsdoc
    move() {
        if (this.isTargeting()) {
            this.target();
        } else if (this.isDischarge()) {
            this.discharge();
        }
    }


    // jsdoc
    isTargeting() {
        return isGreater(world.time, this.targetingStop);
    }


    // jsdoc
    target() {
        this.x = this.getHeroX();
        this.y = this.getHeroY();
    }


    // jsdoc
    getHeroX() {
        return world.hero.body.xCenter - (this.body.xCenter - this.x);
    }


    // jsdoc
    getHeroY() {
        return world.hero.y - this.deltaY.move;
    }


    // jsdoc
    isDischarge() {
        return isGreater(this.chargingStop, world.time) && !isTrue(this.collided);
    }


    // jsdoc
    discharge() {
        this.bodyXY = this.lightningXY;
        this.y += this.deltaY.collided;
        this.collided = true;
    }
}