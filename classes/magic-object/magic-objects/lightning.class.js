class Lightning extends MagicObject {
    radDispl = 260;
    pages = { move: 2, collided: 8, epilog: 9 };
    bodyXY = { xLeft: 114, xCenter: 130, xRight: 146, yTop: 32, yCenter: 128, yBottom: 224 };
    loadXY = { xLeft: 120, xCenter: 128, xRight: 136, yTop: 180, yCenter: 128, yBottom: 226 };
    lightningXY = { xLeft: 114, xCenter: 130, xRight: 146, yTop: 32, yCenter: 128, yBottom: 224 };


    constructor(x, y, otherDirection) {
        super(source.lightning, x, y);
        this.setMagic(otherDirection, 40, 'lightning8');

        this.searchStop = 5000 + getTime();
    }


    move() {
        if (isGreater(world.time, this.searchStop)) {
            this.x = world.hero.body.xCenter - (this.body.xCenter - this.x);
        }
    }


    // class Lightning ...
    // class MagicObject ...
    // class Shaman ...
    // './img' --> 'img' ...
    // magic soung (cast + hit) ...
}