/**
 * Represents a dino.
 * @extends Enemy
 */
class Dino extends Enemy {
    radDispl = 104;
    bodyXY = { xLeft: 4, xCenter: 52, xRight: 100, yTop: 43, yCenter: 65, yBottom: 87 };
    weaponXY = { xLeft: 48, xRight: 68, yTop: 52, yBottom: 80 };
    damage = { trigger: 'attack4', value: 12, time: 0 };
    biteDistance = 80;
    pursuitDistance = 320;
    pursuitStop = 0;


    /**
     * Creates a dino.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        super(source.dino, x, y);
        this.setEnemy(90, 64, 'pursue');
    }


    /**
     * Applies the pursuit.
     */
    pursue() {
        if (this.isWalk() && this.isPeaceful()) {
            this.applySpeedType('x', this.otherDirection, 'speed');
            this.applyGravity();
        }
    }


    /**
     * Applies the gravity.
     */
    applyGravity() {
        let grassL = world.grass.find(g => isIncluded(g.xLeft, this.body.xRight - 24, g.xRight));
        let grassC = world.grass.find(g => isIncluded(g.xLeft, this.body.xCenter, g.xRight));
        let grassR = world.grass.find(g => isIncluded(g.xLeft, this.body.xLeft + 24, g.xRight));
        if (!grassL && !grassC && !grassR) {
            this.applyFallSpeed();
        }
    }


    /**
     * Verifies, if the walk animation is to play.
     * @returns {boolean} - A boolean value.
     */
    isWalk() {
        return this.isPursuing();
    }


    /**
     * Verifies, if the dino is pursuing.
     * @returns {boolean} - A boolean value.
     */
    isPursuing() {
        if (this.isTracking(this.xCenter, world.hero.xCenter)) {
            return this.updatePursuitParameters(true);
        } else if (this.isTracking(world.hero.xCenter, this.xCenter)) {
            return this.updatePursuitParameters(false);
        } else if (this.isToReposition()) {
            return this.updatePursuitParameters();
        } else if (this.isSearching()) {
            return true;
        } else {
            return false;
        }
    }


    /**
     * Verifies, if the dino is tracking the hero.
     * @param {number} a - The x value of the object a.
     * @param {number} b - The x value of the object b.
     * @returns {boolean} - A boolean value.
     */
    isTracking(a, b) {
        let biteX = this.getBiteX(a, b);
        let xIncluded = isIncluded(0, biteX, this.pursuitDistance);
        let yIncluded = isIncluded(this.yTop, world.hero.yCenter, this.yBottom);
        return xIncluded && yIncluded;
    }


    /**
     * Provides the x value of the dino bite.
     * @param {number} a - The x value of the object a.
     * @param {number} b - The x value of the object b.
     * @returns {boolean} - A boolean value.
     */
    getBiteX(a, b) {
        return a - b - this.biteDistance;
    }


    /**
     * Updates the parameters of the pursuit.
     * @param {boolean} logical - A boolean value.
     * @returns {boolean} - A boolean Value.
     */
    updatePursuitParameters(logical) {
        this.pursuitStop = getTime();
        this.setOtherDirection(logical);
        return true;
    }


    /**
     * Sets the other direction.
     * @param {boolean} logical - A boolean value.
     */
    setOtherDirection(logical) {
        if (!isUndefined(logical)) {
            this.otherDirection = logical;
        }
    }


    /**
     * Verifies, if the dino is to reposition.
     * @returns {boolean} - A boolean value.
     */
    isToReposition() {
        let triggered = this.isTrigger(true) && this.isTrigger(false);
        return triggered && isIncluded(this.yTop, world.hero.yCenter, this.yBottom);
    }


    /**
     * Verifies, if there is a trigger of reposition.
     * @param {boolean} logical - A boolean value.
     * @returns {boolean} - A boolean value.
     */
    isTrigger(logical) {
        if (isTrue(logical)) {
            let heroX = getSum(world.hero.xCenter, this.biteDistance);
            return !isGreater(heroX, this.xCenter);
        } else if (!isTrue(logical)) {
            let heroX = getSum(world.hero.xCenter, -this.biteDistance);
            return isGreater(heroX, this.xCenter);
        }
    }


    /**
     * Verifies, if the dino is searching.
     * @returns {boolean} - A boolean value.
     */
    isSearching() {
        return !isOnTime(world.time, this.pursuitStop, 5000);
    }
}