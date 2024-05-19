class Dino extends Enemy {
    energy = 100;
    pursuitStop = 0;
    radDispl = 104;
    bodyXY = { xLeft: 4, xCenter: 52, xRight: 100, yTop: 43, yCenter: 65, yBottom: 87 };
    weaponXY = { xLeft: 48, xRight: 68, yTop: 52, yBottom: 80 };


    constructor(x, y) {
        super(source.dino, x, y);
        this.setSpeed(64);    // to move? + value!
        this.animate();    // to move? + to activate!
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


    isAttack() {
        return this.isBattle(world.hero) && !world.hero.isDeath();
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


    isIdle() {
        return true;
    }




    // jsdoc
    resetCurrentImage() {
        if (!this.isSimilarChapter()) {
            this.setObjectValue('currentImage', 0);
        }
    }


    // jsdoc
    isSimilarChapter() {
        let key = this.getSimilarChapter();
        let last = this.lastChapter.includes(key);
        let current = this.chapter.includes(key);
        return isMatch(last, current);
    }


    // jsdoc
    getSimilarChapter() {
        return this.chapter.replace(/[A-Z][a-z]+/, '');
    }


    setChapter() {
        this.lastChapter = this.chapter;
        this.chapter = this.getChapter();
    }


    // jsdoc
    getChapter() {
        for (let i = 0; i < this.chapters.length; i++) {
            let condition = this.getCondition(i);
            if (this.isChapter(condition)) {
                return this.chapters[i];
            }
        }
    }


    // jsdoc
    getCondition(i) {
        let condition = this.chapters[i];
        let initial = condition[0];
        return 'is' + condition.replace(initial, initial.toUpperCase());
    }


    // jsdoc
    isChapter(condition) {
        return this[condition]();
    }


    // jsdoc
    playAnimation() {
        super.playAnimation(this.flipBook[this.chapter]);
    }
}