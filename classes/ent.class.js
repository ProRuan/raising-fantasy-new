/**
 * Represents an ent.
 * @extends Enemy
 */
class Ent extends Enemy {
    radDispl = 232;
    bodyXY = { xLeft: 100, xCenter: 116, xRight: 132, yTop: 92, yCenter: 134, yBottom: 176 };
    weaponXY = { xLeft: 52, xRight: 124, yTop: 112, yBottom: 176 };
    damage = { trigger: 'attack3', value: 16, time: 0 };
    patrolDistance = 160;
    patrolBreak = 2500;
    lastTurn = 0;


    /**
     * Creates an ent.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        super(source.ent, x, y);
        this.setEnemy(120, 48, 'patrol');
    }


    /**
     * Applies the patrol.
     */
    patrol() {
        this.setPatrolEndpoints();
        if (this.isPatrol(this.xWest, this.xCenter, true)) {
            this.updateParameters(this.otherDirection, -this.speed);
        } else if (this.isTurn(true)) {
            this.updateParameters(false, 0);
        } else if (this.isPatrol(this.xCenter, this.xEast, false)) {
            this.updateParameters(this.otherDirection, this.speed);
        } else if (this.isTurn(false)) {
            this.updateParameters(true, 0);
        }
    }


    /**
     * Sets the endpoints of the patrol.
     */
    setPatrolEndpoints() {
        if (isUndefined(this.xWest)) {
            this.xWest = getSum(this.xCenter, -this.patrolDistance);
            this.xEast = getSum(this.xCenter, this.patrolDistance);
        }
    }


    /**
     * Verifies, if the ent is patrolling.
     * @param {number} valueA - The value a to compare.
     * @param {number} valueB - The value b to compare.
     * @param {boolean} logical - A boolean value.
     * @returns {boolean} - A boolean value.
     */
    isPatrol(valueA, valueB, logical) {
        return isGreater(valueA, valueB) && this.isOtherDirection(logical);
    }


    /**
     * Updates the parameters of the patrol.
     * @param {boolean} logical - A boolean value.
     * @param {number} speed - The value of the speed.
     */
    updateParameters(logical, speed) {
        this.otherDirection = logical;
        this.lastTurn = getTime();
        this.updateSpeed(speed);
    }


    /**
     * Updates the speed.
     * @param {number} speed - The value of the speed.
     */
    updateSpeed(speed) {
        if (this.isPeaceful()) {
            this.x += speed;
        }
    }


    /**
     * Verifies, if the ent is to turn.
     * @param {boolean} logical - A boolean value.
     * @returns {boolean} - A boolean value.
     */
    isTurn(logical) {
        let onTime = isOnTime(world.time, this.lastTurn, this.patrolBreak);
        if (isTrue(logical)) {
            return onTime && this.isOtherDirection(true);
        } else {
            return onTime && this.isOtherDirection(false);
        }
    }


    /**
     * Verifies, if the ent looks to the other direction.
     * @param {boolean} logical - A boolean value.
     * @returns {booelan} - A boolean value.
     */
    isOtherDirection(logical) {
        return (isTrue(logical)) ? isTrue(this.otherDirection) : !isTrue(this.otherDirection);
    }


    /**
     * Verifies, if the walk animation is to play.
     * @returns {boolean} - A boolean value.
     */
    isWalk() {
        return this.isPatrol(this.xWest, this.xCenter, true) || this.isPatrol(this.xCenter, this.xEast, false);
    }
}