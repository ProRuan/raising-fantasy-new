class Shaman extends Enemy {
    radDispl = 144;
    bodyXY = { xLeft: 56, xCenter: 72, xRight: 88, yTop: 104, yCenter: 154, yBottom: 204 };

    weaponXY = { xLeft: 46, xRight: 94, yTop: 127, yBottom: 143 };    // to edit
    bladeXY = { xLeft: 46, xRight: 94, yTop: 127, yBottom: 143 };    // to edit
    // fireXY ...
    // lightningXY ...


    constructor(x, y) {
        super(source.shaman, x, y);

        this.otherDirection = false;
        this.img.src = this.flipBook.castBlade[3];

        // this.setEnemy(90, 64, 'pursue');
    }
}