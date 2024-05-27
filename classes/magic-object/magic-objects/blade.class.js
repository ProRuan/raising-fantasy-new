class Blade extends MagicObject {
    radDispl = 278;
    speedXY = { s: 256, yUp: 112.8, yDown: -16.8 };
    pages = { move: [0, 3], collided: [3, 6], epilog: [6, 7] };
    bodyXY = { xLeft: 115, xCenter: 139, xRight: 163, yTop: 121, yCenter: 129, yBottom: 137 };


    // jsdoc
    constructor(x, y, otherDirection) {
        super(source.blade, x, y);
        this.setMagic(otherDirection, 20, 'blade6');
        this.setSpeed();
    }


    // jsdoc
    setSpeed() {
        if (isGreater(world.hero.body.yCenter, this.body.yCenter)) {
            super.setSpeed(this.speedXY.s, 0, this.speedXY.yUp);
        } else {
            super.setSpeed(this.speedXY.s, 0, this.speedXY.yDown);
        }
    }


    // jsdoc
    move() {
        if (!isTrue(this.collided)) {
            this.applySpeedType('x', true, 'speed');
            this.applySpeedType('y', true, 'speedY');
        }
    }
}