/**
 * Represents a knight.
 * @extends Character
 */
class Knight extends Character {
    radDispl = 84;
    xStopLeft = source.startX;
    xStopRight = source.crystalXCenter;
    chapters = [
        'epilog', 'death', 'hurt', 'climb', 'jump', 'runAttack', 'run',
        'walkAttack', 'walk', 'attack', 'idle', 'cover'
    ];
    bodyXY = { xLeft: 28, xCenter: 44, xRight: 60, yTop: 62, yCenter: 86, yBottom: 110 };
    weaponXY = { xLeft: 24, xRight: 60, yTop: 56, yBottom: 104 };
    attackXY = { xLeft: 24, xRight: 60, yTop: 56, yBottom: 104 };
    walkAttackXY = { xLeft: 24, xRight: 50, yTop: 56, yBottom: 108 };
    bombXY = { x: 42, y: 75 };
    goAway = { path: source.goAway, startTime: 0.3 };
    armorHit = { path: source.armorHit, startTime: 0 };
    staveStep = { path: source.staveStep, startTime: 0 };
    grassStep = { path: source.grassStep, startTime: 0 };
    swordDraw = { path: source.swordDraw, startTime: 0.3 };
    skillUpgrade = { path: source.skillUpgrade, startTime: 0 };


    /**
     * Creates a knight.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        super(source.knight, x, y);
        this.setSpeed(128, 256);
        this.animate();
        this.setMusic(source.ambience);
    }


    /**
     * Moves the knight.
     */
    move() {
        this.applyGravity();
        this.resetJumpCounter();
        this.act();
        this.setChapter();
        this.resetCurrentImage();
        this.updateGroundLevel();
        this.startBossBattle();
        this.updateCameraX();
        this.startAmbientSound();
        this.setStartTime();
    }


    /**
     * Plays the actions of the knight.
     */
    act() {
        this.climb();
        this.jump();
        this.run();
        this.throw();
        this.attack();
        this.idle();
        this.flip();
        this.collect();
    }


    /**
     * Applies the climb.
     */
    climb() {
        this.climbUp();
        this.climbDown();
    }


    /**
     * Applies the jump.
     */
    jump() {
        if (super.isJump()) {
            super.jump();
        }
    }


    /**
     * Applies the run.
     */
    run() {
        let fine = !this.isEpilog() && !this.isDeath();
        if (isGreater(this.xStopLeft, this.body.xCenter) && fine) {
            this.runTo('arrowLeft', true);
        }
        if (isGreater(this.body.xCenter, this.xStopRight) && fine) {
            this.runTo('arrowRight', false);
        }
    }


    /**
     * Applies the run to the requested direction.
     * @param {string} key - The name of the key.
     * @param {boolean} value - A boolean value.
     */
    runTo(key, value) {
        if (isKey(key)) {
            super.move(value, key);
        }
    }


    /**
     * Applies the throw of the bomb.
     */
    throw() {
        if (this.bombUnlocked) {
            this.throwBomb();
            this.resetBomb();
        }
    }


    /**
     * Throws the bomb.
     */
    throwBomb() {
        if (this.isBombThrow() && !isTrue(this.otherDirection)) {
            let [x, y] = this.getBombCoord();
            this.bomb = new Bomb(x, y);
            this.energyPoints.splice(0, 100);
        }
    }


    /**
     * Verifies, if the throw of the bomb is possible.
     * @returns {boolean} - A boolean value.
     */
    isBombThrow() {
        return isKey('keyF') && isUndefined(this.bomb) && isMatch(this.energyPoints.length, 100);
    }


    /**
     * Provides the coordinates of the bomb.
     * @returns {array} - The array with the coordinates of the bomb.
     */
    getBombCoord() {
        let x = (this.x - this.bombXY.x) / UNIT;
        let tempY = this.y + this.height + this.bombXY.y;
        let y = (canvas.height - tempY) / UNIT;
        return [x, y];
    }


    /**
     * Resets the bomb.
     */
    resetBomb() {
        let bombBurst = this.bomb && isGreater(this.bomb.time, world.time);
        let bombOut = this.bomb && isGreater(this.abyssLevel, this.bomb.y);
        if (bombBurst || bombOut) {
            this.bomb.stop(true);
            delete this.bomb;
        }
    }


    /**
     * Applies the attack.
     */
    attack() {
        this.setWeaponState();
        this.applyStamina();
    }


    /**
     * Sets the state of the weapon.
     */
    setWeaponState() {
        if (this.isImage('run_attack')) {
            this.setWeaponDamage(this.walkAttackXY, 25);
        } else if (this.isImage('walk_attack')) {
            this.setWeaponDamage(this.walkAttackXY, 20);
        } else if (this.isImage('/attack')) {
            this.setWeaponDamage(this.attackXY, 15);
        }
    }


    /**
     * Sets the damage of the weapon.
     * @param {object} weapon - The weapon object.
     * @param {number} value - The value of the damage.
     */
    setWeaponDamage(weapon, value) {
        this.weaponXY = weapon;
        this.weaponDamage = value;
    }


    /**
     * Applies the stamina.
     */
    applyStamina() {
        if (this.isAttack()) {
            this.staminaPoints.splice(this.staminaPoints.length - 1, 1);
        }
    }


    /**
     * Applies the idle.
     */
    idle() {
        if (this.isIdleUpdate()) {
            let nextIdle = getSum(world.time, this.idleDelay);
            this.lastIdle = nextIdle;
        }
    }


    /**
     * Verifies, if the time of the idle is to update.
     * @returns {boolean} - A boolean value.
     */
    isIdleUpdate() {
        let noIdle = !isMatch(this.chapter, 'idle') && !isMatch(this.chapter, 'cover');
        let idleEnd = isMatch(this.chapter, 'idle') && this.isImage('idle12');
        return noIdle || idleEnd;
    }


    /**
     * Applies the collecting.
     */
    collect() {
        this.collectItem('coins');
        this.collectItem('crystals');
        this.collectItem('hearts');
        this.collectItem('hitPoints');
        this.collectItem('leaves');
        this.collectItem('stars');
    }


    /**
     * Applies the collecting of items.
     * @param {string} key - The key of the item group.
     */
    collectItem(key) {
        let object = this.getObject(key);
        if (object) {
            object.effect();
            this.removeObject(key, object);
        }
    }


    /**
     * Provides the item to collect.
     * @param {string} key - The key of the item group.
     * @returns {object} - The item to collect.
     */
    getObject(key) {
        return world[key].find(o => isCollided(this.body, o));
    }


    /**
     * Removes the collected item.
     * @param {string} key - The key of the item group.
     * @param {object} object - The collected item to remove.
     */
    removeObject(key, object) {
        world[key].splice(object.getId(key), 1);
    }


    /**
     * Plays the animation and the sounds.
     */
    play() {
        this.playAnimation();
        this.playSoundEffects();
    }


    /**
     * Plays the animation.
     */
    playAnimation() {
        if (!this.isJump()) {
            super.playAnimation(this.flipBook[this.chapter]);
        } else {
            this.playJumpAnimation();
        }
    }


    /**
     * Verifies the jump.
     * @returns {boolean} - A boolean value.
     */
    isJump() {
        return isGreater(-1, this.jumpCounter);
    }


    /**
     * Plays the sound effects.
     */
    playSoundEffects() {
        this.playSound('death6', this.goAway, 'death10');
        this.playSound('climb2', this.staveStep, 'climb4');
        this.playSound('jump7', this.grassStep);
        this.playSound('run_attack2', this.grassStep, 'run_attack6');
        this.playSound('run_attack4', this.swordDraw);
        this.playSound('run2', this.grassStep, 'run6');
        this.playSound('walk_attack2', this.grassStep, 'walk_attack5');
        this.playSound('walk_attack4', this.swordDraw);
        this.playSound('walk2', this.grassStep, 'walk5');
        this.playSound('/attack2', this.swordDraw);
    }
}