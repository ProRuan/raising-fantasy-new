class Shaman extends Enemy {
    radDispl = 144;
    bodyXY = { xLeft: 56, xCenter: 72, xRight: 88, yTop: 104, yCenter: 154, yBottom: 204 };
    weaponXY = { xLeft: 0, xRight: 0, yTop: 0, yBottom: 0 };
    bladeXY = { xLeft: -57, xRight: 220, yTop: -284, yBottom: 0 };
    fireXY = { xLeft: -20, xRight: 228, yTop: -297, yBottom: 0 };
    lightningXY = { xLeft: -130, xRight: 228, yTop: -14 + 96, yBottom: 0 };
    magicRange = 760;
    spellCast = false;


    // tasks
    // -----
    // double code (this.magic)!!!
    // set magic delay
    // set endboss animation
    // set endboss battle trigger
    // set final scene


    // jsdoc
    constructor(x, y) {
        super(source.shaman, x, y);
        this.setEnemy(300, 64, 'cast');
    }


    cast() {
        this.resetMagicCast();

        // this.damageByLightning();

        this.damage();
        this.recast();
    }


    // jsdoc
    resetMagicCast() {
        if (this.isMagicCastReset()) {
            this.spellCast = false;
        }
    }


    // jsdoc
    isMagicCastReset() {
        if (this.magic) {
            return this.isOutOfRange() || this.magic.removeable;
        }
    }


    // jsdoc
    isOutOfRange() {
        let outX = getSum(this.x, -this.magicRange);
        return isGreater(this.magic.xRight, outX);
    }


    // jsdoc
    damage() {
        if (this.isCollided()) {
            this.magic.collided = true;
            world.hero.damage(this.magic.damage);
        }
    }


    // jsdoc
    isCollided() {
        if (this.magic) {
            return !isTrue(this.magic.collided) && isCollided(world.hero.body, this.magic.body);
        }
    }


    damageByLightning() {
        if (this.isCollidedLightning()) {
            this.reduceHeroHp();
        }
    }


    isCollidedLightning() {
        if (this.magic) {
            return isCollided(world.hero.body, this.magic.body);
        }
    }


    reduceHeroHp() {
        world.hero.hpPoints.splice(world.hero.hpPoints.length - 1, 1);
    }


    // jsdoc
    recast() {
        if (!isTrue(this.spellCast)) {
            this.spellCast = true;
            this.updateRate();
            this.castRandomly();
        }
    }


    // jsdoc
    updateRate() {
        let hp = this.getHp();
        if (isGreater(70, hp)) {
            this.setRate(0, 4, 7);
        } else if (isGreater(40, hp)) {
            this.setRate(0, 3, 6);
        } else if (isGreater(10, hp)) {
            this.setRate(0, 2, 5);
        } else if (isGreater(10, hp)) {
            this.setRate(0, 1, 3);
        }
    }


    // jsdoc
    getHp() {
        return this.hp / 300 * 100;
    }


    // jsdoc
    setRate(a, b, c) {
        this.rate = { blade: a, fire: b, lightning: c };
    }


    // jsdoc
    castRandomly() {
        let number = getRandomNumber(9, 9);
        if (isGreater(this.rate.lightning, number)) {
            this.selectMagic('lightning');
        } else if (isGreater(this.rate.fire, number)) {
            this.selectMagic('fire');
        } else if (isGreater(this.rate.blade, number)) {
            this.selectMagic('blade');
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