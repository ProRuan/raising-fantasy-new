class Shaman extends Enemy {
    radDispl = 144;
    spellCast = false;
    bodyXY = { xLeft: 56, xCenter: 72, xRight: 88, yTop: 104, yCenter: 154, yBottom: 204 };

    weaponXY = { xLeft: 46, xRight: 94, yTop: 127, yBottom: 143 };    // to edit
    bladeXY = { xLeft: -57, xRight: 220, yTop: -284, yBottom: 0 };
    fireXY = { xLeft: -20, xRight: 228, yTop: -297, yBottom: 0 };

    loadXY = { xLeft: -130, xRight: 228, yTop: -14 + 96, yBottom: 0 };   // to edit
    lightningXY = { xLeft: -130, xRight: 228, yTop: -14, yBottom: 0 };


    constructor(x, y) {
        super(source.shaman, x, y);

        // this.weaponXY = this.bladeXY;
        // this.setLightning();
        this.setEnemy(90, 64, 'cast');
    }


    cast() {
        if (this.magic && this.magic.x + this.magic.width < this.x - 760) {
            this.spellCast = false;
        }
        if (this.magic && this.magic.removeable) {
            this.spellCast = false;
        }
        if (this.magic && !isTrue(this.magic.collided) && isCollided(world.hero.body, this.magic.body)) {
            this.magic.collided = true;
            if (world.hero.hpPoints.length < this.magic.damage) {
                world.hero.hpPoints.splice(0, world.hero.hpPoints.length);
            } else {
                world.hero.hpPoints.splice(world.hero.hpPoints.length - this.magic.damage, this.magic.damage);
            }
            console.log(world.hero.hpPoints.length);
        }
        if (!isTrue(this.spellCast)) {
            this.spellCast = true;
            this.setLightning();

            // this.setBlade();    // finished
            // this.setFire();    // finished
        }
    }


    setBlade() {
        this.weaponXY = this.bladeXY;

        let x = this.weapon.xLeft / 64;
        let y = this.weapon.yTop / 64;
        this.magic = new Blade(x, y, this.otherDirection);
    }


    setFire() {
        this.weaponXY = this.fireXY;

        let x = this.weapon.xLeft / 64;
        let y = this.weapon.yTop / 64;
        this.magic = new Fire(x, y, this.otherDirection);
    }


    setLightning() {
        let x = (world.hero.body.xCenter + this.loadXY.xLeft) / 64;
        let y = (canvas.height - world.hero.yBottom + this.loadXY.yTop) / 64;
        // let x = (world.hero.body.xCenter + this.lightningXY.xLeft) / 64;
        // let y = (canvas.height - world.hero.yBottom + this.lightningXY.yTop) / 64;
        this.magic = new Lightning(x, y, this.otherDirection);

        // console.log(world.hero.body.xCenter, this.magic.body.xCenter, world.hero.body.yBottom, this.magic.body.yBottom);
    }


    // add chapters, isCastBlade, castBlade and so on ...


    isAttack() {
        return false;
    }


    isWalk() {
        return false;
    }
}