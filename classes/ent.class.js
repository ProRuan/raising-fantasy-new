class Ent extends Enemy {
    radDispl = 232;
    bodyXY = { xLeft: 100, xCenter: 116, xRight: 132, yTop: 92, yCenter: 134, yBottom: 176 };
    weaponXY = { xLeft: 52, xRight: 124, yTop: 112, yBottom: 176 };
    damage = { trigger: 'attack3', value: 16, time: 0 };
    patrolDistance = 160;
    patrolBreak = 2500;
    lastTurn = 0;


    // jsdoc
    constructor(x, y) {
        super(source.ent, x, y);
        this.setEnemy(120, 48, 'patrol');
    }


    // jsdoc
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


    // jsdoc
    setPatrolEndpoints() {
        if (isUndefined(this.xWest)) {
            this.xWest = getSum(this.xCenter, -this.patrolDistance);
            this.xEast = getSum(this.xCenter, this.patrolDistance);
        }
    }


    // jsdoc
    isPatrol(valueA, valueB, logical) {
        return isGreater(valueA, valueB) && this.isOtherDirection(logical);
    }


    // jsdoc
    updateParameters(logical, speed) {
        this.otherDirection = logical;
        this.lastTurn = getTime();
        this.updateSpeed(speed);
    }


    // jsdoc
    updateSpeed(speed) {
        if (this.isFine()) {
            this.x += speed;
        }
    }


    // jsdoc
    isTurn(logical) {
        if (isTrue(logical)) {
            return isOnTime(world.time, this.lastTurn, this.patrolBreak) && this.isOtherDirection(true);
        } else {
            return isOnTime(world.time, this.lastTurn, this.patrolBreak) && this.isOtherDirection(false);
        }

    }


    // jsdoc
    isOtherDirection(logical) {
        return (isTrue(logical)) ? isTrue(this.otherDirection) : !isTrue(this.otherDirection);
    }


    // jsdoc
    isWalk() {
        return this.isPatrol(this.xWest, this.xCenter, true) || this.isPatrol(this.xCenter, this.xEast, false);
    }
}