class Blade extends MagicObject {
    radDispl = 278;
    bodyXY = { xLeft: 115, xCenter: 139, xRight: 163, yTop: 121, yCenter: 129, yBottom: 137 };


    constructor(x, y) {
        super(source.blade, x, y);

        // only for testing!!!
        this.otherDirection = false;
    }


    // only for testing!!!
    animate() {
        this.img.src = this.flipBook[0];
    }
}