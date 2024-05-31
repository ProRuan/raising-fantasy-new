class Shaman extends Enemy {
    radDispl = 144;
    bodyXY = { xLeft: 56, xCenter: 72, xRight: 88, yTop: 104, yCenter: 154, yBottom: 204 };
    weaponXY = { xLeft: 0, xRight: 0, yTop: 0, yBottom: 0 };
    bladeXY = { xLeft: -57, xRight: 220, yTop: -284, yBottom: 0 };
    fireXY = { xLeft: -20, xRight: 228, yTop: -297, yBottom: 0 };
    lightningXY = { xLeft: -130, xRight: 228, yTop: -14 + 96, yBottom: 0 };
    chapters = ['epilog', 'death', 'hurt', 'anger', 'castBlade', 'castFire', 'castLightning', 'idle'];
    angerLevel = 0;
    magicRange = 760;
    spellCast = false;


    // jsdoc
    constructor(x, y) {
        super(source.shaman, x, y);
        this.setEnemy(300, 64, 'cast');
    }


    // jsdoc
    get triggered() {
        return world.hero.bossBattleStarted;
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
        if (this.isCastReady()) {
            this.hurt();
            this.resetMagicCast();
            this.damage();
            this.recast();
        } else if (this.isDeath()) {
            this.setUndefined('magic');
            world.raiseVictoryPodium();
        }
    }


    // jsdoc
    isCastReady() {
        return !this.isDeath() && isTrue(this.triggered);
    }


    // jsdoc
    hurt() {
        if (this.isBombBurst()) {
            this.applyBombBurst();
            this.keepHurt();
            this.resetDelay();
        }
    }


    // jsdoc
    applyBombBurst() {
        if (!world.hero.bomb.collided) {
            world.hero.bomb.collided = true;
            this.hp -= world.hero.bomb.damage;
        }
    }


    // jsdoc
    isBombBurst() {
        return world.hero.bomb && isCollided(this.body, world.hero.bomb.body);
    }


    // jsdoc
    keepHurt() {
        if (isMatch(this.chapter, 'hurt')) {
            this.currentImage = (isGreater(1, this.currentImage)) ? 1 : this.currentImage;
        }
    }


    // jsdoc
    resetDelay() {
        if (isUndefined(this.magic)) {
            this.spellCast = false;
            clearTimeout(this.delayId);
        }
    }


    // jsdoc
    isHurt() {
        return world.hero.bomb && world.hero.bomb.collided;
    }


    // jsdoc
    resetMagicCast() {
        if (this.isMagicCastReset()) {
            this.spellCast = false;
            this.magic = undefined;
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


    // jsdoc
    recast() {
        if (!isTrue(this.spellCast) || !this.magic) {
            if (!isTrue(this.spellCast)) {
                this.spellCast = true;
                this.delayCast();
            }
        }
    }


    // jsdoc
    delayCast() {
        this.delayId = setTimeout(() => {
            this.updateRate();
            this.castRandomly();
        }, 1000);
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
        return this.hp / this.hpMax * 100;
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


    // jsdoc
    isAnger() {
        if (this.triggered) {
            let hp = this.getHp();
            return this.playAnger(hp);
        }
    }


    // jsdoc
    playAnger(hp) {
        if (isGreater(70, hp)) {
            return this.playAngerLevel(0);
        } else if (isGreater(40, hp)) {
            return this.playAngerLevel(1);
        } else if (isGreater(10, hp)) {
            return this.playAngerLevel(2);
        } else if (isGreater(0, hp)) {
            return this.playAngerLevel(3);
        }
    }


    // jsdoc
    playAngerLevel(n) {
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
            this.playSound(this.growl);
            clearTimeout(this.delayId);
        }
    }


    // jsdoc
    calm() {
        setTimeout(() => {
            this.angerLevel++;
            this.angry = false;
            this.resetDelay();
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
}