class Blade extends MagicObject {
    radDispl = 278;
    pages = { move: 3, collided: 6, epilog: 7 };
    bodyXY = { xLeft: 115, xCenter: 139, xRight: 163, yTop: 121, yCenter: 129, yBottom: 137 };
    step = { x: 256, yUp: 112.8, yDown: -16.8 };


    // jsdoc
    constructor(x, y, otherDirection) {
        super(source.blade, x, y);
        this.setMagic(otherDirection, 20, 'blade6');
        this.setSpeed();
        this.playSound(this.sound.cast);
    }


    // jsdoc
    setSpeed() {
        if (isGreater(world.hero.body.yCenter, this.body.yCenter)) {
            super.setSpeed(this.step.x, 0, this.step.yUp);
        } else {
            super.setSpeed(this.step.x, 0, this.step.yDown);
        }
    }


    // jsdoc
    cast() {
        if (!isTrue(this.collided)) {
            this.x -= this.speed;
            this.y -= this.speedY;
        }
    }
}