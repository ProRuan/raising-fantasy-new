class Fire extends MagicObject {
    radDispl = 248;
    bodyXY = { xLeft: 108, xCenter: 124, xRight: 140, yTop: 120, yCenter: 128, yBottom: 136 };


    constructor(x, y, otherDirection) {
        super(source.fire, x, y);
        this.otherDirection = otherDirection;
    }


    // only for testing!!!
    animate() {
        this.img.src = this.flipBook[0];
    }
}