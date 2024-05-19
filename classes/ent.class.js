class Ent extends Enemy {
    radDispl = 232;
    bodyXY = { xLeft: 100, xCenter: 116, xRight: 132, yTop: 92, yCenter: 134, yBottom: 176 };
    weaponXY = { xLeft: 52, xRight: 124, yTop: 112, yBottom: 176 };
    patrolDistance = 160;
    patrolBreak = 2500;
    lastTurn = 0;


    constructor(x, y) {
        super(source.ent, x, y);
        this.setStateValues(120, 48);
        this.setAct('patrol');
        this.setPatrolEndpoints();
        this.animate();    // to move?
    }


    // jsdoc
    setPatrolEndpoints() {
        this.xWest = getSum(this.xCenter, -this.patrolDistance);
        this.xEast = getSum(this.xCenter, this.patrolDistance)
    }


    // jsdoc
    patrol() {
        if (this.isPatrol(this.xWest, this.xCenter, true)) {
            this.updateParameter(-this.speed, this.otherDirection);
        } else if (this.isTurn(true)) {
            this.updateParameter(0, false);
        } else if (this.isPatrol(this.xCenter, this.xEast, false)) {
            this.updateParameter(this.speed, this.otherDirection);
        } else if (this.isTurn(false)) {
            this.updateParameter(0, true);
        }
    }


    // jsdoc
    isPatrol(valueA, valueB, logical) {
        return isLarger(valueA, valueB) && this.isOtherDirection(logical);
    }


    // jsdoc
    updateParameter(speed, logical) {
        this.lastTurn = getTime();
        if (this.isFine()) {
            this.x += speed;
            this.otherDirection = logical;
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