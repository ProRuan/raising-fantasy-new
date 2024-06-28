/**
 * Represents a boss.
 * @extends Enemy
 */
class Boss extends Enemy {
    chapters = ['epilog', 'death', 'hurt', 'anger', 'castBlade', 'castFire', 'castLightning', 'idle'];
    angerLevel = 0;
    magicRange = 760;
    nextCast = 0;
    angerDelay = 2400;
    castDelay = 1000;
    spellCast = false;


    /**
     * Creates a boss.
     * @param {object} source - The source object.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(source, x, y) {
        super(source, x, y);
        this.setEnemy(300, 64, 'move');
    }


    /**
     * Provides a boolean value which triggers the boss battle.
     */
    get triggered() {
        return world.hero.bossBattleStarted && isMatch(world.cameraX, -6720);
    }


    /**
     * Provides the milliseconds of the cast duration.
     */
    get ms() {
        let key = this.getCastKey();
        return this.flipBook[key].length * 100;
    }


    /**
     * Provides the key of the cast.
     * @returns {string} - The key of the cast.
     */
    getCastKey() {
        return 'cast' + formatInitial(this.magicChapter, 'toUpperCase');
    }


    /**
     * Applies the hurt.
     */
    hurt() {
        if (this.isBombBurst()) {
            this.applyBombBurst();
            this.keepHurt();
            this.updateCast(this.castDelay);
        }
    }


    /**
     * Verifies, if the bomb is burst.
     * @returns {boolean} - A boolean value.
     */
    isBombBurst() {
        return world.hero.bomb && isCollided(this.body, world.hero.bomb.body);
    }


    /**
     * Applies the burst of the bomb.
     */
    applyBombBurst() {
        if (!world.hero.bomb.collided) {
            world.hero.bomb.burst(this);
        }
    }


    /**
     * Keeps the hurt animation.
     */
    keepHurt() {
        if (isMatch(this.chapter, 'hurt')) {
            this.currentImage = (isGreater(1, this.currentImage)) ? 1 : this.currentImage;
        }
    }


    /**
     * Updates the cast.
     * @param {number} delay - The delay in milliseconds.
     */
    updateCast(delay) {
        this.nextCast = getSum(world.time, delay);
    }


    /**
     * Verifies, if the hurt is to play.
     * @returns 
     */
    isHurt() {
        return world.hero.bomb && world.hero.bomb.collided;
    }


    /**
     * Resets the magic cast.
     */
    resetMagicCast() {
        if (this.isMagicCastReset()) {
            this.spellCast = false;
            this.removeMagic();
        }
    }


    /**
     * Verifies, if the magic cast is to reset.
     * @returns {boolean} - A boolean value.
     */
    isMagicCastReset() {
        if (this.magic) {
            return this.isOutOfRange() || isGreater(this.magic.time, world.time);
        }
    }


    /**
     * Verifies, if the magic is out of range.
     * @returns {boolean} - A boolean value.
     */
    isOutOfRange() {
        let outX = getSum(this.x, -this.magicRange);
        return isGreater(this.magic.xRight, outX);
    }


    /**
     * Removes the magic.
     */
    removeMagic() {
        if (this.magic) {
            this.magic.stop(true);
            delete this.magic;
        }
    }


    /**
     * Applies the damage of the magic.
     */
    damage() {
        if (this.isLightning()) {
            this.reduceHeroHp();
        } else if (this.isCollided()) {
            this.magic.collided = true;
            world.hero.damage(this.magic.damage);
        }
    }


    /**
     * Verifies, if the magic type is 'lightning'.
     * @returns {boolean} - A boolean value.
     */
    isLightning() {
        return this.magic instanceof Lightning && isCollided(world.hero.body, this.magic.body);
    }


    /**
     * Reduces the hp of the hero.
     */
    reduceHeroHp() {
        world.hero.hpPoints.splice(world.hero.hpPoints.length - 1, 1);
    }


    /**
     * Verifies, if the magic is collided.
     * @returns {boolean} - A boolean value.
     */
    isCollided() {
        if (this.magic) {
            return !this.magic.collided && isCollided(world.hero.body, this.magic.body);
        }
    }


    /**
     * Verifies, if the boss is angry.
     * @returns {boolean} - A boolean value.
     */
    isAnger() {
        if (this.triggered) {
            let hp = this.getHp();
            return this.playAnger(hp);
        }
    }


    /**
     * Plays the anger.
     * @param {number} hp - The hp value of the boss.
     * @returns {boolean} - A boolean value.
     */
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


    /**
     * Plays the anger level.
     * @param {number} n - The level of anger.
     * @returns {boolean} - A boolean value.
     */
    playAngerLevel(n) {
        if (isMatch(this.angerLevel, n)) {
            this.setAnger();
            this.calm();
            return true;
        }
    }


    /**
     * Sets the anger.
     */
    setAnger() {
        if (!isTrue(this.angry)) {
            this.angry = true;
            this.calmTime = getSum(world.time, 1400);
            this.playSound(this.growl);
            this.updateCast(this.angerDelay);
        }
    }


    /**
     * Calms the boss.
     */
    calm() {
        if (isTimeout(this.calmTime, world.time)) {
            this.angerLevel++;
            this.angry = false;
            this.startMusic(this.triggered, 250);
            delete this.calmTime;
        }
    }


    /**
     * Verifies, if the cast type is 'blade'.
     * @returns {boolean} - A boolean value.
     */
    isCastBlade() {
        return isMatch(this.magicChapter, 'blade');
    }


    /**
    * Verifies, if the cast type is 'fire'.
    * @returns {boolean} - A boolean value.
    */
    isCastFire() {
        return isMatch(this.magicChapter, 'fire');
    }


    /**
    * Verifies, if the cast type is 'lightning'.
    * @returns {boolean} - A boolean value.
    */
    isCastLightning() {
        return isMatch(this.magicChapter, 'lightning');
    }
}