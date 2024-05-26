class Shaman extends Enemy {
    radDispl = 144;
    bodyXY = { xLeft: 56, xCenter: 72, xRight: 88, yTop: 104, yCenter: 154, yBottom: 204 };

    weaponXY = { xLeft: 46, xRight: 94, yTop: 127, yBottom: 143 };    // to edit
    bladeXY = { xLeft: -57, xRight: 220, yTop: -284, yBottom: 0 };
    fireXY = { xLeft: -20, xRight: 228, yTop: -297, yBottom: 0 };

    lightningXY = { xLeft: -130, xRight: 228, yTop: -14, yBottom: 0 };
    loadXY = { xLeft: -130, xRight: 228, yTop: -14, yBottom: 0 };   // to edit


    constructor(x, y) {
        super(source.shaman, x, y);

        // this.otherDirection = false;
        this.img.src = this.flipBook.castLightning[3];
        this.weaponXY = this.lightningXY;
        // this.setLightning();
        this.setEnemy(90, 64, 'cast');
    }


    cast() {
        this.setLightning();
    }


    setBlade() {
        let x = this.weapon.xLeft / 64;
        let y = this.weapon.yTop / 64;
        this.magic = new Blade(x, y, this.otherDirection);
    }


    setFire() {
        let x = this.weapon.xLeft / 64;
        let y = this.weapon.yTop / 64;
        this.magic = new Fire(x, y, this.otherDirection);
    }


    setLightning() {
        let x = (world.hero.body.xCenter + this.lightningXY.xLeft) / 64;
        let y = (canvas.height - world.hero.yBottom + this.lightningXY.yTop) / 64;
        this.magic = new Lightning(x, y, this.otherDirection);

        console.log(world.hero.body.xCenter, this.magic.body.xCenter, world.hero.body.yBottom, this.magic.body.yBottom);
    }


    // add chapters, isCastBlade, castBlade and so on ...


    isAttack() {
        return false;
    }


    isWalk() {
        return false;
    }
}