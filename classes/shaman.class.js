class Shaman extends Enemy {
    radDispl = 144;
    bodyXY = { xLeft: 56, xCenter: 72, xRight: 88, yTop: 104, yCenter: 154, yBottom: 204 };
    weaponXY = { xLeft: 0, xRight: 0, yTop: 0, yBottom: 0 };
    bladeXY = { xLeft: -57, xRight: 220, yTop: -284, yBottom: 0 };
    fireXY = { xLeft: -20, xRight: 228, yTop: -297, yBottom: 0 };
    lightningXY = { xLeft: -130, xRight: 228, yTop: -14 + 96, yBottom: 0 };
    spellCast = false;


    // jsdoc
    constructor(x, y) {
        super(source.shaman, x, y);
        this.setEnemy(90, 64, 'cast');
    }


    cast() {
        if (this.magic && this.magic.x + this.magic.width < this.x - 760) {
            this.spellCast = false;
        }
        if (this.magic && this.magic.removeable) {
            this.spellCast = false;
        }
        if (this.magic && isCollided(world.hero.body, this.magic.body)) {
            world.hero.hpPoints.splice(world.hero.hpPoints.length - 1, 1);
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
        // console.log(world.hero.body.yBottom, this.magic.body.yBottom);
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
        this.weaponXY = this.lightningXY;

        let x = (world.hero.body.xCenter + this.weapon.xLeft) / 64;
        let y = (canvas.height - world.hero.yBottom + this.weapon.yTop) / 64;
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



    // class Shaman ...
    // './img' --> 'img' ...
    // magic soung (cast + hit) ...

    // make grey pictures ('game over') ...

    // think about getter body() --> get () --> return getBody() ...
}