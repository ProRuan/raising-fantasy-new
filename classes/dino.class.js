class Dino extends Enemy {
    radDispl = 104;
    bodyXY = { xLeft: 4, xCenter: 52, xRight: 100, yTop: 43, yCenter: 65, yBottom: 87 };
    weaponXY = { xLeft: 48, xRight: 68, yTop: 52, yBottom: 80 };
    pursuitStop = 0;


    constructor(x, y) {
        super(source.dino, x, y);
        this.setStateValues(90, 64);
        this.setAct('pursue');
        this.animate();
    }


    // jsdoc
    pursue() {
        if (this.isWalk() && this.isFine()) {
            this.applySpeedType('x', this.otherDirection, 'speed');
        }
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


    isTracking(valueA, valueB) {
        let difference = valueA - valueB - 80;
        return isIncluded(0, difference, 320) && isIncluded(this.yTop, world.hero.yCenter, this.yBottom);
    }


    updatePursuitParameters(logical) {
        this.pursuitStop = world.time;
        if (!isUndefined(logical)) {
            this.otherDirection = logical;
        }
        return true;
    }


    isToReposition() {
        return !isLarger(world.hero.xCenter + 80, this.xCenter) && isLarger(world.hero.xCenter - 320, this.xCenter) && isIncluded(this.yTop, world.hero.yCenter, this.yBottom);
    }


    // jsdoc
    isSearching() {
        return !isOnTime(world.time, this.pursuitStop, 5000);
    }


    // jsdoc
    isWalk() {
        return this.isPursuing();
    }
}