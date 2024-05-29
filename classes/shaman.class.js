class Shaman extends Enemy {
    radDispl = 144;
    bodyXY = { xLeft: 56, xCenter: 72, xRight: 88, yTop: 104, yCenter: 154, yBottom: 204 };
    weaponXY = { xLeft: 0, xRight: 0, yTop: 0, yBottom: 0 };
    bladeXY = { xLeft: -57, xRight: 220, yTop: -284, yBottom: 0 };
    fireXY = { xLeft: -20, xRight: 228, yTop: -297, yBottom: 0 };
    lightningXY = { xLeft: -130, xRight: 228, yTop: -14 + 96, yBottom: 0 };
    magicRange = 760;
    spellCast = false;


    // jsdoc
    constructor(x, y) {
        super(source.shaman, x, y);
        this.setEnemy(90, 64, 'cast');
    }


    cast() {
        if (this.isOutOfRange()) {
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

            this.selectMagic('lightning');
        }
        // console.log(world.hero.body.yBottom, this.magic.body.yBottom);
    }


    // jsdoc
    isOutOfRange() {
        if (this.magic) {
            let outX = getSum(this.x, -this.magicRange);
            return isGreater(this.magic.xRight, outX);
        }
    }


    // jsdoc
    selectMagic(type) {
        (!isMatch(type, 'lighting')) ? this.castMagic(type) : this.castLightning();
    }


    // jsdoc
    castMagic(type) {
        this.setWeaponXY(type);
        let x = this.getWeaponXY('xLeft');
        let y = this.getWeaponXY('yTop');
        this.setMagicObject(type, x, y);
    }


    // jsdoc
    setWeaponXY(type) {
        let key = type + 'XY';
        this.weaponXY = this[key];
    }


    // jsdoc
    getWeaponXY(key) {
        return this.weapon[key] / UNIT;
    }


    // jsdoc
    setMagicObject(type, x, y) {
        if (isMatch(type, 'blade')) {
            this.setMagic(new Blade(x, y, this.otherDirection));
        } else if (isMatch(type, 'fire')) {
            this.setMagic(new Fire(x, y, this.otherDirection));
        } else if (isMatch(type, 'lightning')) {
            this.setMagic(new Lightning(x, y, this.otherDirection));
        }
    }


    // jsdoc
    setMagic(magic) {
        this.magic = magic;
    }


    // jsdoc
    castLightning() {
        this.setWeaponXY('lightning')
        let x = this.getLightningX();
        let y = this.getLightningY();
        this.setMagicObject('lightning', x, y);
    }


    // jsdoc
    getLightningX() {
        return (world.hero.body.xCenter + this.weapon.xLeft) / UNIT;
    }


    // jsdoc
    getLightningY() {
        return (canvas.height + (world.hero.yBottom - this.weapon.yTop)) / UNIT;
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