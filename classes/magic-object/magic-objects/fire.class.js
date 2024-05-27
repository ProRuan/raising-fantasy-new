class Fire extends MagicObject {
    radDispl = 248;
    speedXY = { s: 128, yUp: 112.8, yDown: -16.8 };    // to set!
    pages = { move: [0, 3], collided: [3, 9], epilog: [9, 10] };
    bodyXY = { xLeft: 108, xCenter: 124, xRight: 140, yTop: 120, yCenter: 128, yBottom: 136 };


    // jsdoc
    constructor(x, y, otherDirection) {
        super(source.fire, x, y);
        this.setMagic(otherDirection, 30, 'fire9');
        this.setSpeed(this.speedXY.s);
    }


    // Think about setSpeed() of Blade and MagicObject!!!


    // to edit!!!
    move() {

    }
}