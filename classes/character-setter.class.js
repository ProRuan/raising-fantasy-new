/**
 * Represents a character setter.
 * @extends MoveableObject
 */
class CharacterSetter extends MoveableObject {


    /**
     * 
     * @param {object} source - The source object.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(source, x, y) {
        super(source, x, y);
    }


    /**
     * Animates the character.
     */
    animate() {
        this.setPauseableInterval(() => this.move(), 1000 / 60);
        this.setPauseableInterval(() => this.play(), 100);
    }


    /**
     * Resets the jump counter.
     */
    resetJumpCounter() {
        if (!isMatch(this.chapter, 'jump')) {
            this.increaseJumpCounter(false);
        }
    }


    /**
     * Applies the climbing up.
     */
    climbUp() {
        if (this.isClimbUp()) {
            this.speedY = 0;
            let nextY = getSum(this.body.yBottom, -this.speed);
            let ladder = this.getWorldObject('ladders', 'isLadderTop');
            this.setYUp(nextY, ladder);
        }
    }


    /**
     * Sets the y value during climbing up.
     * @param {number} nextY - The next y value.
     * @param {LadderT} ladder - The top ladder object.
     */
    setYUp(nextY, ladder) {
        if (isGreater(nextY, ladder.yTop)) {
            this.setClimbEndY(ladder.yTop);
        } else {
            this.y -= this.speed;
        }
    }


    /**
     * Sets the y value to the top y value of the top ladder object.
     * @param {number} endpoint - The top y value of the top ladder object.
     */
    setClimbEndY(endpoint) {
        let deltaY = this.body.yBottom - this.y;
        this.y = endpoint - deltaY;
    }


    /**
     * Applies the climbing down.
     */
    climbDown() {
        if (this.isClimbDown()) {
            this.speedY = 0;
            let nextY = getSum(this.body.yBottom, this.speed);
            let ladder = this.getWorldObject('ladders', 'isLadderBottom');
            this.setYDown(nextY, ladder);
        }
    }


    /**
     * Set the y value during climbing down.
     * @param {number} nextY - The next y value.
     * @param {LadderB} ladder - The bottom ladder object.
     */
    setYDown(nextY, ladder) {
        if (isGreater(ladder.yBottom, nextY)) {
            this.setClimbEndY(ladder.yBottom);
        } else if (this.isClimbTopPoint()) {
            this.y += this.speed;
        }
    }


    /**
     * Verifies, if the top ladder object is in range.
     * @returns {boolean} - A boolean value.
     */
    isClimbTopPoint() {
        let ladder = this.getWorldObject('ladders', 'isLadderTop');
        return isGreater(ladder.yTop, this.body.yBottom, 'tolerant');
    }


    /**
     * Flips the character.
     */
    flip() {
        this.changeDirection('keyQ', true);
        this.changeDirection('keyE', false);
    }


    /**
     * Changes the direction of the character.
     * @param {string} key - The name of the key.
     * @param {boolean} logical - A boolean value.
     */
    changeDirection(key, logical) {
        if (isKey(key)) {
            this.setOtherDirection(logical);
        }
    }


    /**
     * Verifies, if the epilog animation is to play.
     * @returns {boolean} - A boolean value.
     */
    isEpilog() {
        return this.isDeath() && this.isImage('death10') || isGreater(canvas.height, this.y);
    }


    /**
     * Verifies, if the death animation is to play.
     * @returns {boolean} - A boolean value.
     */
    isDeath() {
        return !isGreater(0, this.hpPoints.length);
    }


    /**
    * Verifies, if the hurt animation is to play.
    * @returns {boolean} - A boolean value.
    */
    isHurt() {
        let enemyHit = this.getWorldObject('enemies', 'isEnemyHit');
        let webHit = this.getWorldObject('enemies', 'isWebHit');
        let magicHit = this.getWorldObject('bosses', 'isMagicHit');
        return enemyHit || webHit || magicHit;
    }


    /**
     * Provides an object of the world.
     * @param {string} key - The key of the object.
     * @param {string} method - The key of the method.
     * @returns {boolean} - A boolean value.
     */
    getWorldObject(key, method) {
        return this.world[key].find(enemy => this[method](enemy));
    }


    /**
     * Verifies, if the hit comes from an enemy.
     * @param {Enemy} enemy - The enemy object.
     * @returns {boolean} - A boolean value.
     */
    isEnemyHit(enemy) {
        let inBattle = enemy.isBattle(this) && enemy.isAttack();
        return enemy && enemy.ableToFight && inBattle;
    }


    /**
     * Verifies, if the hit comes from a web.
     * @param {Enemy} enemy - The enemy object.
     * @returns {boolean} - A boolean value.
     */
    isWebHit(enemy) {
        let web = enemy instanceof Spider && enemy.web;
        return web && isCollided(this.body, enemy.web);
    }


    /**
     * Verifies, if the hit comes from magic.
     * @param {Enemy} enemy - The enemy object.
     * @returns {boolean} - A boolean value.
     */
    isMagicHit(enemy) {
        let magic = enemy.magic;
        return magic && isCollided(this.body, magic.body);
    }


    /**
     * Verifies, if the jump animation is to play.
     * @returns {boolean} - A boolean value.
     */
    isJump() {
        return isKey('space') && !this.isAboveGround();
    }


    /**
     * Plays the jump animation.
     */
    playJumpAnimation() {
        if (this.isJumpPhase(0)) {
            this.playJump(0, true);
        } else if (this.isJumpPhase(1) && isGreater(0, this.speedY)) {
            this.playJump(2);
        } else if (this.isJumpPhase(1)) {
            this.playJump(3, true);
        } else if (this.isJumpPhase(2) && isGreater(this.speedY, 0)) {
            this.playJump(5);
        } else if (this.isJumpPhase(2)) {
            this.playJump(6, false);
        }
    }


    /**
     * Verifies the current jump phase.
     * @param {number} i - The value of the jump counter. 
     * @returns {boolean} - A boolean value.
     */
    isJumpPhase(i) {
        return isMatch(this.jumpCounter, i);
    }


    /**
     * Plays the jump.
     * @param {number} i - The value of the jump counter.
     * @param {boolean} set - A boolean value.
     */
    playJump(i, set) {
        super.playAnimation([this.flipBook.jump[i]]);
        this.playJumpNext(i);
        this.setJumpCounter(set);
    }


    /**
     * Plays the next jump animation.
     * @param {number} i - The value of the jump counter.
     */
    playJumpNext(i) {
        if (isMatch(i, 0) || isMatch(i, 3)) {
            if (isTimeout(this.jumpTime, world.time)) {
                this.playJump(++i);
                delete this.jumpTime;
            } else {
                this.jumpTime = getSum(world.time, 100 / 3);
            }
        }
    }


    /**
     * Sets the value of the jump counter.
     * @param {boolean} set - A boolean value.
     */
    setJumpCounter(set) {
        if (!isUndefined(set) && isTrue(set)) {
            this.increaseJumpCounter(true);
        } else if (!isUndefined(set) && !isTrue(set)) {
            this.increaseJumpCounter(false);
        }
    }


    /**
     * Increases the value of the jump counter.
     * @param {boolean} logical - A boolean value.
     */
    increaseJumpCounter(logical) {
        (logical) ? this.jumpCounter++ : this.jumpCounter = -1;
    }


    /**
     * Verifies, if the run attack animation is to play.
     * @returns {boolean} - A boolean value.
     */
    isRunAttack() {
        return this.isRun() && this.isAttack();
    }


    /**
     * Verifies, if the run animation is to play.
     * @returns {boolean} - A boolean value.
     */
    isRun() {
        return isKey('arrowLeft', 'doubleClick') || isKey('arrowRight', 'doubleClick');
    }


    /**
     * Verifies, if the walk attack animation is to play.
     * @returns {boolean} - A boolean value.
     */
    isWalkAttack() {
        return this.isWalk() && this.isAttack();
    }


    /**
     * Verifies, if the walk animation is to play.
     * @returns {boolean} - A boolean value.
     */
    isWalk() {
        return isKey('arrowLeft') || isKey('arrowRight');
    }


    /**
     * Verifies, if the attack animation is to play.
     * @returns {boolean} - A boolean value.
     */
    isAttack() {
        return isKey('keyA') && isGreater(0, world.hero.staminaPoints.length);
    }


    /**
    * Verifies, if the idle animation is to play.
    * @returns {boolean} - A boolean value.
    */
    isIdle() {
        return isOnTime(this.world.time, this.lastIdle, this.idleDelay);
    }


    /**
     * Verifies, if the cover animation is to play.
     * @returns {boolean} - A boolean value.
     */
    isCover() {
        return true;
    }
}