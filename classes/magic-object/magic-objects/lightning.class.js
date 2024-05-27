class Lightning extends MagicObject {
    radDispl = 260;
    bodyXY = { xLeft: 114, xCenter: 130, xRight: 146, yTop: 32, yCenter: 128, yBottom: 224 };
    loadXY = { xLeft: 120, xCenter: 128, xRight: 136, yTop: 180, yCenter: 128, yBottom: 226 };
    lightningXY = { xLeft: 114, xCenter: 130, xRight: 146, yTop: 32, yCenter: 128, yBottom: 224 };


    constructor(x, y, otherDirection) {
        super(source.lightning, x, y);

        this.bodyXY = this.loadXY;
        this.otherDirection = otherDirection;    // necessary?
    }


    // only for testing!!!
    animate() {
        this.img.src = this.flipBook[0];
    }


    // class Lightning
    // class Fire ...
    // class Blade ...
    // class MagicObject ...
    // class Shaman ...
    // './img' --> 'img' ...
    // speedXY + pagesXY ...
}