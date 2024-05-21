class Dino extends Enemy {
    radDispl = 104;
    bodyXY = { xLeft: 4, xCenter: 52, xRight: 100, yTop: 43, yCenter: 65, yBottom: 87 };
    weaponXY = { xLeft: 48, xRight: 68, yTop: 52, yBottom: 80 };
    biteDistance = 80;
    pursuitDistance = 320;
    pursuitStop = 0;


    // jsdoc
    constructor(x, y) {
        super(source.dino, x * UNIT, y * UNIT);
        this.setStateValues(90, 64);
        this.setAct('pursue');
        // this.animate();
    }


    // jsdoc
    pursue() {
        if (this.isWalk() && this.isFine()) {
            this.applySpeedType('x', this.otherDirection, 'speed');
        }
    }


    // jsdoc
    isWalk() {
        return this.isPursuing();
    }


    // jsdoc
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


    // jsdoc
    isTracking(a, b) {
        let biteX = this.getBiteX(a, b);
        return isIncluded(0, biteX, this.pursuitDistance) && isIncluded(this.yTop, world.hero.yCenter, this.yBottom);
    }


    // jsdoc
    getBiteX(a, b) {
        return a - b - this.biteDistance;
    }


    // jsdoc
    updatePursuitParameters(logical) {
        this.pursuitStop = getTime();
        this.setOtherDirection(logical);
        return true;
    }


    // jsdoc
    setOtherDirection(logical) {
        if (!isUndefined(logical)) {
            this.otherDirection = logical;
        }
    }


    // jsdoc
    isToReposition() {
        return this.isTrigger(true) && this.isTrigger(false) && isIncluded(this.yTop, world.hero.yCenter, this.yBottom);
    }


    // jsdoc
    isTrigger(logical) {
        if (isTrue(logical)) {
            let heroX = getSum(world.hero.xCenter, this.biteDistance);
            return !isLarger(heroX, this.xCenter);
        } else if (!isTrue(logical)) {
            let heroX = getSum(world.hero.xCenter, -this.biteDistance);
            return isLarger(heroX, this.xCenter);
        }
    }


    // jsdoc
    isSearching() {
        return !isOnTime(world.time, this.pursuitStop, 5000);
    }
}