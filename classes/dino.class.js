class Dino extends Enemy {
    energy = 100;
    pursuitStop = 0;
    radDispl = 104;
    offsetX = { left: 4, center: 52, right: 100 };
    offsetY = { top: 43, center: 65, bottom: 87 };


    constructor(x, y) {
        super(source.dino, x, y);
        this.setSpeed(64);    // to move?
        this.animate();    // to move?
    }


    // jsdoc + move?!?
    get weapon() {
        return {
            'xLeft': (this.otherDirection) ? this.x + 96 - this.radDispl - 12 : this.x + 96 + 6,
            'xRight': (this.otherDirection) ? this.x + 124 - this.radDispl - 12 : this.x + 124 + 6,
            'yTop': this.y + 52,
            'yBottom': this.y + 80
        }
    }


    animate() {
        setInterval(() => {
            this.passAway();
            this.hurt();

            // if (this.isBattle(world.hero)) {
            //     console.log('bite: ', this.weapon.xLeft - this.xLeft, this.xCenter, this.weapon.xRight - this.xRight);
            // }

            this.walk();
        }, 1000 / 60);


        setInterval(() => {
            if (this.isDead()) {
                this.img.src = this.flipBook.death[this.flipBook.death.length - 1];
            } else if (this.energy <= 0) {
                this.playAnimation(this.flipBook.death);
            } else if (this.isHurt()) {
                this.playAnimation(this.flipBook.hurt);
            } else if (this.isBattle(world.hero)) {
                this.playAnimation(this.flipBook.attack);
            } else if (this.isWalking()) {
                this.playAnimation(this.flipBook.walk);
            } else {
                this.playAnimation(this.flipBook.idle);
            }
        }, 100);
    }


    isDead() {
        return !isLarger(0, this.energy) && this.isFileName('death6');    // 'death?'
    }


    // jsdoc
    passAway() {
        if (this.isDead() && isUndefined(this.dead)) {
            this.setObjectValue('dead', true);
        }
    }


    // jsdoc
    isFileName(value) {
        return this.img.src.includes(value);
    }


    isHurt() {
        return world.hero.isAttack() && world.hero.isBattle();
    }


    hurt() {
        if (this.isHurt() && isOnTime(world.time, this.lastHit, this.hitDelay)) {
            this.energy -= 20;
            this.lastHit = world.time + this.hitDelay;
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
        } else if (!this.isSearching()) {
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
        return isOnTime(world.time, this.pursuitStop, 5000);
    }


    isWalking() {
        return this.isPursuing() && !this.isBattle(world.hero);
    }


    walk() {
        if (this.isWalking() && !this.isHurt()) {
            this.x += (this.otherDirection) ? -this.speed : this.speed;
        }
    }
}