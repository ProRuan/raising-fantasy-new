class Shaman extends Enemy {
    radDispl = 144;
    bodyXY = { xLeft: 56, xCenter: 72, xRight: 88, yTop: 104, yCenter: 154, yBottom: 204 };
    weaponXY = { xLeft: 0, xRight: 0, yTop: 0, yBottom: 0 };
    bladeXY = { xLeft: -57, xRight: 220, yTop: -284, yBottom: 0 };
    fireXY = { xLeft: -20, xRight: 228, yTop: -297, yBottom: 0 };
    lightningXY = { xLeft: -130, xRight: 228, yTop: -14 + 96, yBottom: 0 };
    chapters = ['epilog', 'death', 'anger', 'hurt', 'castBlade', 'castFire', 'castLightning', 'idle'];
    angerLevel = 0;
    magicRange = 760;
    spellCast = false;


    // tasks
    // -----
    // set firstAngerX (world.hero.x) ...
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


    // jsdoc
    get ms() {
        let key = this.getCastKey();
        return this.flipBook[key].length * 100;
    }


    // jsdoc
    getCastKey() {
        return 'cast' + formatInitial(this.magicChapter, 'toUpperCase');
    }


    // jsdoc
    cast() {
        this.resetMagicCast();
        this.damage();
        this.recast();
    }


    // jsdoc
    resetMagicCast() {
        if (this.isMagicCastReset()) {
            this.spellCast = false;
            this.magic = undefined;    // not verified!
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
        if (this.isLightning()) {
            this.reduceHeroHp();
        } else if (this.isCollided()) {
            this.magic.collided = true;
            world.hero.damage(this.magic.damage);
        }
    }


    // jsdoc
    isLightning() {
        return this.magic instanceof Lightning && isCollided(world.hero.body, this.magic.body);
    }


    // jsdoc
    reduceHeroHp() {
        world.hero.hpPoints.splice(world.hero.hpPoints.length - 1, 1);
    }


    // jsdoc
    isCollided() {
        if (this.magic) {
            return !this.magic.collided && isCollided(world.hero.body, this.magic.body);
        }
    }



    recast() {
        if (!isTrue(this.spellCast) || !this.magic) {    // yes, no
            if (!isTrue(this.spellCast)) {
                this.spellCast = true;    // verified
                setTimeout(() => {
                    this.updateRate();    // verified
                    this.castRandomly();    // verified
                }, 1000);
            }
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
        } else if (isGreater(0, hp)) {
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
        let number = getRandomNumber(9, 8);
        if (isGreater(this.rate.lightning, number)) {
            this.setCast('lightning');
        } else if (isGreater(this.rate.fire, number)) {
            this.setCast('fire');
        } else if (isGreater(this.rate.blade, number)) {
            this.setCast('blade');
        }
    }


    // jsdoc
    setCast(key) {
        this.magicChapter = key;
        setTimeout(() => this.selectMagic(key), 300);
        setTimeout(() => this.setUndefined('magicChapter'), this.ms);
    }


    // jsdoc
    setUndefined(key) {
        this[key] = undefined;
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


    // jsdoc
    isAnger() {
        let hp = this.getHp();
        if (isGreater(70, hp)) {
            return this.playAnger(0);
        } else if (isGreater(40, hp)) {
            return this.playAnger(1);
        } else if (isGreater(10, hp)) {
            return this.playAnger(2);
        } else if (isGreater(0, hp)) {
            return this.playAnger(3);
        }
    }


    // jsdoc
    playAnger(n) {
        if (isMatch(this.angerLevel, n)) {
            this.setAnger();
            return true;
        }
    }


    // jsdoc
    setAnger() {
        if (!isTrue(this.angry)) {
            this.angry = true;
            this.calm();
        }
    }


    // jsdoc
    calm() {
        setTimeout(() => {
            this.angerLevel++;
            this.angry = false;
        }, 1400);
    }


    // jsdoc
    isCastBlade() {
        return isMatch(this.magicChapter, 'blade');
    }


    // jsdoc
    isCastFire() {
        return isMatch(this.magicChapter, 'fire');
    }


    // jsdoc
    isCastLightning() {
        return isMatch(this.magicChapter, 'lightning');
    }




    // class Shaman ...
    // './img' --> 'img' ...
    // magic soung (cast + hit) ...

    // make grey pictures ('game over') ...

    // think about getter body() --> get () --> return getBody() ...
}