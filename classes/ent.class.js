class Ent extends Enemy {
    radDispl = 232;
    bodyXY = { xLeft: 100, xCenter: 116, xRight: 132, yTop: 92, yCenter: 134, yBottom: 176 };
    weaponXY = { xLeft: 52, xRight: 124, yTop: 112, yBottom: 176 };
    patrolX = { xWest: -160, xEast: 160 };
    patrolBreak = 2500;
    lastTurn = 0;


    constructor(x, y) {
        super(source.ent, x, y);
        this.setStateValues(120, 48);
        this.setPatrolX();
        this.animate();    // to move?
    }


    setPatrolX() {    // to edit!
        this.xWest = this.xCenter + this.patrolX.xWest;
        this.xEast = this.xCenter + this.patrolX.xEast;
    }


    animate() {    // to move?
        this.setStoppableInterval(() => this.live(), 1000 / 60);
        this.setStoppableInterval(() => this.playAnimation(), 100);
    }


    // jsdoc
    live() {
        this.passAway();
        this.hurt();
        this.walk()
        this.setChapter();
        this.resetCurrentImage();
    }


    // jsdoc
    walk() {
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