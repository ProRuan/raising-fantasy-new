class Dino extends Enemy {
    energy = 100;    // to set or defense!!!
    pursuitStop = 0;
    radDispl = 104;
    bodyXY = { xLeft: 4, xCenter: 52, xRight: 100, yTop: 43, yCenter: 65, yBottom: 87 };
    weaponXY = { xLeft: 48, xRight: 68, yTop: 52, yBottom: 80 };


    constructor(x, y) {
        super(source.dino, x, y);
        this.setSpeed(64);    // to move? + value!
        // this.animate();    // to move? + to activate!
    }


    animate() {
        setInterval(() => {
            // only for testing!!1
            if (isKey('keyQ')) {
                this.setObjectValue('otherDirection', true);
            }
            if (isKey('keyE')) {
                this.setObjectValue('otherDirection', false);
            }


            this.passAway();
            this.hurt();

            // if (this.isBattle(world.hero)) {
            //     console.log('bite: ', this.weapon.xLeft - this.xLeft, this.xCenter, this.weapon.xRight - this.xRight);
            // }

            this.walk();

            this.setChapter();
            this.resetCurrentImage();

        }, 1000 / 60);


        setInterval(() => {
            this.playAnimation();
        }, 100);
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


    isWalk() {
        return this.isPursuing() && !this.isBattle(world.hero);
    }


    walk() {
        if (this.isWalk() && !this.isHurt() && !this.isDeath()) {
            this.x += (this.otherDirection) ? -this.speed : this.speed;
        }
    }
}