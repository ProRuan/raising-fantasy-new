class Shaman extends Enemy {
    radDispl = 144;
    bodyXY = { xLeft: 56, xCenter: 72, xRight: 88, yTop: 104, yCenter: 154, yBottom: 204 };

    weaponXY = { xLeft: 46, xRight: 94, yTop: 127, yBottom: 143 };    // to edit
    bladeXY = { xLeft: -57, xRight: 220, yTop: -284, yBottom: 0 };    // to edit
    // fireXY ...
    // lightningXY ...


    constructor(x, y) {
        super(source.shaman, x, y);

        // this.otherDirection = false;
        this.img.src = this.flipBook.castBlade[3];
        this.weaponXY = this.bladeXY;
        this.setBlade();
        // this.setEnemy(90, 64, 'pursue');
    }


    setBlade() {
        let x = this.weapon.xLeft / 64;
        let y = this.weapon.yTop / 64;
        this.magic = new Blade(x, y, this.otherDirection);
    }
}