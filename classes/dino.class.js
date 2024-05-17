class Dino extends Enemy {
    otherDirection = true;
    energy = 100;
    pursuitStop = 0;


    constructor(x, y) {
        super(source.dino, x, y);
        this.setFlipBook(source.dino);
        this.setCover(source.dino);
        this.loadImages();
        this.setSpeed(64);
        this.animate();
    }


    // jsdoc
    get body() {
        return {
            'xLeft': this.x + 4,
            'xCenter': this.x + 52,
            'xRight': this.x + 100,
            'yTop': this.y + 43,
            'yCenter': this.y + 65,
            'yBottom': this.y + 87
        }
    }


    // think about value!!!
    get radDispl() {
        return this.width / 2 + 40;
    }


    // jsdoc
    get weapon() {
        return {
            'xLeft': (this.otherDirection) ? this.x + 96 - this.radDispl - 12 : this.x + 96 + 6,
            'xRight': (this.otherDirection) ? this.x + 124 - this.radDispl - 12 : this.x + 124 + 6,
            'yTop': this.y + 52,
            'yBottom': this.y + 80
        }
    }


    setImages() {    // double code (knight)!!!
        for (const [key] of Object.entries(this.flipBook)) {
            let chapter = this.flipBook[key];
            chapter.forEach((c) => {
                let img = new Image();
                img.src = c;
                this.imageCache[c] = img;
            })
        }
    }


    animate() {
        setInterval(() => {
            if (this.isDead()) {
                this.dead = true;
            }


            if (this.isHurt()) {
                this.hurt();
            }


            this.walk();



            // if (this.isBattle(world.hero)) {
            //     console.log('bite: ', this.weapon.xLeft - this.xLeft, this.xCenter, this.weapon.xRight - this.xRight);
            // }
        }, 1000 / 60);


        setInterval(() => {
            if (this.energy <= 0 && this.img.src.includes('death6')) {
                this.img.src = this.flipBook.death[this.flipBook.death.length - 1];
            } else if (this.energy <= 0) {
                this.playAnimation(this.flipBook.death);
            } else if (world.hero.isAttack() && world.hero.isBattle()) {
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


    // jsdoc
    isDead() {
        return !isLarger(0, this.energy) && this.isFileName('death6') && isUndefined(this.dead);    // 'death?'
    }


    // jsdoc
    isFileName(value) {
        return this.img.src.includes(value);
    }


    isHurt() {
        return world.hero.isAttack() && world.hero.isBattle() && isOnTime(world.time, this.lastHit, this.hitDelay);
    }


    hurt() {
        this.energy -= 20;
        this.lastHit = world.time + this.hitDelay;
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
        if (this.isWalking()) {
            this.x += (this.otherDirection) ? -this.speed : this.speed;
        }
    }
}