/**
 * Represents an enemy.
 * @extends MoveableObject
 */
class Enemy extends MoveableObject {
    otherDirection = true;
    chapter = 'idle';
    chapters = ['epilog', 'death', 'hurt', 'attack', 'walk', 'idle'];
    ableToFight = true;


    /**
     * Creates an enemy.
     * @param {object} source - The source object.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(source, x, y) {
        super(source, x * UNIT, y * UNIT);
        this.setAnimation(source);
        this.setEnemySounds(source);
    }


    /**
     * Sets the sounds of the enemy.
     * @param {object} source - The source object.
     */
    setEnemySounds(source) {
        this.growl = source.growl;
        this.weaponImpact = source.weaponImpact;
        this.armorHit = source.armorHit;
    }


    /**
     * Sets the enemy.
     * @param {number} hp - The value of the hp.
     * @param {number} speed - The value of the speed.
     * @param {string} method - The key of the method to apply.
     */
    setEnemy(hp, speed, method) {
        this.setStateValues(hp, speed);
        this.setAct(method);
        this.animate();
    }


    /**
     * Sets the state values.
     * @param {number} hp - The value of the hp.
     * @param {number} speed - The value of the speed.
     */
    setStateValues(hp, speed) {
        this.hpMax = hp;
        this.hp = hp;
        this.setSpeed(speed);
    }


    /**
     * Sets the act of the enemy.
     * @param {string} method - The key of the method to apply.
     */
    setAct(method) {
        this.act = this[method];
    }


    /**
     * Animates the enemy.
     */
    animate() {
        this.setPauseableInterval(() => this.live(), 1000 / 60);
        this.setPauseableInterval(() => this.playAnimation(), 100);
    }


    /**
     * Controls the habit of the enemy.
     */
    live() {
        this.passAway();
        this.hurt();
        this.attack();
        this.act();
        this.setChapter();
        this.resetCurrentImage();
    }


    /**
     * Ends the life of the enemy.
     */
    passAway() {
        if (this.isEpilog() && isUndefined(this.dead)) {
            this.dead = true;
            this.growlTerminally();
        }
    }


    /**
     * Lets the enemy growl terminally.
     */
    growlTerminally() {
        this.playSound(this.growl);
        setTimeout(() => this.playSound(this.growl), 100);
        setTimeout(() => this.playSound(this.growl), 200);
    }


    /**
     * Verifies, if the epilog animation is to play.
     * @returns {boolean} - A boolean value.
     */
    isEpilog() {
        return this.isDeath() && this.isEpilogImage();
    }


    /**
     * Verifies, if the death animation is to play.
     * @returns {boolean} - A boolean value.
     */
    isDeath() {
        return !isGreater(0, this.hp);
    }


    /**
     * Verifies, if the epilog image is reached.
     * @returns {boolean} - A boolean value.
     */
    isEpilogImage() {
        let fileName = 'death' + this.flipBook.death.length;
        return this.isImage(fileName);
    }


    /**
     * Applies the hurt.
     */
    hurt() {
        if (this.isHurt()) {
            if (this.isHeroWeapon()) {
                this.applyWeaponHit();
            }
        }
    }


    /**
     * Verifies, if the hurt animation is to play.
     * @returns {boolean} - A boolean value.
     */
    isHurt() {
        return world.hero.isAttack() && world.hero.isBattle(this);
    }


    /**
     * Verifies, if the enemy collides with a weapon.
     * @returns {boolean} - A boolean value.
     */
    isHeroWeapon() {
        let runAttack = world.hero.isImage('run_attack4');
        let walkAttack = world.hero.isImage('walk_attack4');
        let attack = world.hero.isImage('/attack2');
        return runAttack || walkAttack || attack;
    }


    /**
     * Applies the weapon hit.
     */
    applyWeaponHit() {
        if (this.hitTime && isGreater(this.hitTime, world.time)) {
            this.hp -= world.hero.weaponDamage;
            this.playSound(this.weaponImpact);
            delete this.hitTime;
        } else if (!this.hitTime) {
            this.hitTime = getSum(world.time, 100);
        }
    }


    /**
     * Applies the attack.
     */
    attack() {
        if (this.isImage(this.damage.trigger) && isGreater(this.damage.time, world.time)) {
            this.applyDamage(this.damage.value);
            this.updateDamageTime();
            this.playHeroHitSound();
        }
    }


    /**
     * Applies the damage of the enemy attack.
     * @param {number} damage - The value of the damage.
     */
    applyDamage(damage) {
        let hpPoints = world.hero.hpPoints;
        let diff = getSum(hpPoints.length, -damage);
        this.setHeroHp(damage, hpPoints, diff);
    }


    /**
     * Plays the hit sound of the hero.
     */
    playHeroHitSound() {
        if (!(this instanceof Spider)) {
            this.playSound(this.armorHit);
        }
    }


    /**
     * Sets the hp of the hero.
     * @param {number} damage - The value of the damage.
     * @param {number} hpPoints - The value of the hpPoints.
     * @param {number} diff - The difference of the hp values.
     */
    setHeroHp(damage, hpPoints, diff) {
        if (isGreater(diff, 0)) {
            let rest = hpPoints.length;
            hpPoints.splice(0, rest);
        } else {
            let hp = hpPoints.length - damage;
            hpPoints.splice(hp, damage);
        }
    }


    /**
     * Updates the time of the damage.
     */
    updateDamageTime() {
        let delay = this.flipBook.attack.length * 100;
        this.damage.time = delay + getTime();
    }


    /**
     * Verifies, if the attack animation is to play.
     * @returns {boolean} - A boolean value.
     */
    isAttack() {
        return this.isBattle(world.hero) && !this.isDeath() && !this.isHurt() && !world.hero.isDeath();
    }


    /**
     * Verifies, if the idle animation is to play.
     * @returns {boolean} - A boolean value.
     */
    isIdle() {
        return true;
    }


    /**
     * Verifies, if the enemy is peaceful.
     * @returns {booelan} - A boolean value.
     */
    isPeaceful() {
        return this.isFine() && !this.isAttack();
    }


    /**
     * Verifies, if the enemy is fine.
     * @returns {boolean} - A boolean value.
     */
    isFine() {
        return !(this.isDeath() || this.isHurt());
    }


    /**
     * Plays the animation.
     */
    playAnimation() {
        super.playAnimation(this.flipBook[this.chapter]);
    }
}