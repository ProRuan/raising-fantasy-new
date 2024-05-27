class Fire extends MagicObject {
    radDispl = 248;
    pages = { move: [0, 3], collided: [3, 9], epilog: [9, 10] };
    bodyXY = { xLeft: 108, xCenter: 124, xRight: 140, yTop: 120, yCenter: 128, yBottom: 136 };


    // jsdoc
    constructor(x, y, otherDirection) {
        super(source.fire, x, y);
        this.setMagic(otherDirection, 30, 'fire9');
        this.setSpeed(128, 0, 64);
        this.setEndX();
    }


    // jsdoc
    setEndX() {
        this.endX = this.body.xLeft - 376;
    }


    // jsdoc
    move() {
        if (!isTrue(this.collided)) {
            this.speedAlongX();
            if (isGreater(this.endX, this.body.xLeft)) {
                this.speedAlongY();
            }
        }
    }


    // jsdoc
    speedAlongX() {
        this.x -= this.speed;
    }


    // jsdoc
    speedAlongY() {
        if (this.isDecentered(this, world.hero)) {
            this.y += this.speedY;
        } else if (this.isDecentered(world.hero, this)) {
            this.y -= this.speedY;
        } else {
            this.setTargetedY();
        }
    }


    // jsdoc
    isDecentered(a, b) {
        return this.isAbove(a, b) && !this.isTargetedY(b, a);
    }


    // jsdoc
    isAbove(a, b) {
        return isGreater(a.body.yCenter, b.body.yCenter);
    }


    // jsdoc
    isTargetedY(a, b) {
        return isGreater(a.body.yCenter, b.body.yCenter + this.speedY);
    }


    // jsdoc
    setTargetedY() {
        this.y = world.hero.body.yCenter - (this.body.yCenter - this.y);
    }
}