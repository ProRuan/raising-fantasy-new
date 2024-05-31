class Boss extends Enemy {
    chapters = ['epilog', 'death', 'hurt', 'anger', 'castBlade', 'castFire', 'castLightning', 'idle'];
    angerLevel = 0;
    magicRange = 760;
    spellCast = false;


    constructor(source, x, y) {
        super(source, x, y)
        this.setEnemy(300, 64, 'move');
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
    hurt() {
        if (this.isBombBurst()) {
            this.applyBombBurst();
            this.keepHurt();
            this.resetDelay();
        }
    }


    // jsdoc
    isBombBurst() {
        return world.hero.bomb && isCollided(this.body, world.hero.bomb.body);
    }


    // jsdoc
    applyBombBurst() {
        if (!world.hero.bomb.collided) {
            world.hero.bomb.burst(this);
        }
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
            this.startMusic(this.triggered, 250);
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