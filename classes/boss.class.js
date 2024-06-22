class Boss extends Enemy {
    chapters = ['epilog', 'death', 'hurt', 'anger', 'castBlade', 'castFire', 'castLightning', 'idle'];
    angerLevel = 0;
    magicRange = 760;
    nextCast = 0;
    angerDelay = 2400;
    castDelay = 1000;
    spellCast = false;


    // jsdoc
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
            this.updateCast(this.castDelay);
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
    updateCast(delay) {
        this.nextCast = getSum(world.time, delay);
    }


    // jsdoc
    isHurt() {
        return world.hero.bomb && world.hero.bomb.collided;
    }


    // jsdoc
    resetMagicCast() {
        if (this.isMagicCastReset()) {
            this.spellCast = false;
            this.removeMagic();
        }
    }


    // jsdoc
    isMagicCastReset() {
        if (this.magic) {
            return this.isOutOfRange() || isGreater(this.magic.time, world.time);
        }
    }


    // jsdoc
    isOutOfRange() {
        let outX = getSum(this.x, -this.magicRange);
        return isGreater(this.magic.xRight, outX);
    }


    // jsdoc
    removeMagic() {
        if (this.magic) {
            this.magic.stop(true);
            delete this.magic;
        }
    }


    damage() {
        if (this.isLightning()) {    // apply cast delay depending on flip book length!
            this.reduceHeroHp();
        } else if (this.isCollided()) {    // apply cast delay depending on flip book length!
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


    setAnger() {
        if (!isTrue(this.angry)) {
            this.angry = true;
            this.calmTime = world.time + 1400;
            this.playSound(this.growl);
            this.updateCast(this.angerDelay);
        }
        this.calm();
    }


    calm() {
        if (this.calmTime && isGreater(this.calmTime, world.time)) {
            this.angerLevel++;
            this.angry = false;
            this.startMusic(this.triggered, 250);
            delete this.calmTime;
        }
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