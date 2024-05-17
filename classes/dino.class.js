class Dino extends MoveableObject {
    otherDirection = true;
    energy = 100;


    constructor(x, y) {
        super(source.dino, x, y);
        this.setFlipBook(source.dino);
        this.setCover(source.dino);
        this.loadImages();
        this.setSpeed(64);
        this.animate();
    }


    get offsetX() {
        return {
            'left': this.x + 4,
            'center': this.x + 52,
            'right': this.x + 100
        }
    }


    get offsetY() {
        return {
            'top': this.y + 43,
            'center': this.y + 65,
            'bottom': this.y + 87
        }
    }


    get xLeft() {
        return this.x + 4;
    }


    get xCenter() {
        return this.x + 52;
    }


    get xRight() {
        return this.x + 100;
    }


    get yTop() {
        return this.y + 43;
    }


    get yCenter() {
        return this.y + 65;
    }


    get yBottom() {
        return this.y + 87;
    }


    get radDispl() {
        return this.width / 2 + 40;
    }


    get weapon() {
        return {
            'xLeft': (this.otherDirection) ? this.x + 96 - this.radDispl - 12 : this.x + 96 + 6,
            'xRight': (this.otherDirection) ? this.x + 124 - this.radDispl - 12 : this.x + 124 + 6,
            'yTop': this.y + 52,
            'yBottom': this.y + 80
        }
    }


    get xLeftAttack() {
        return this.x + 96;
    }


    get xRightAttack() {
        return this.x + 124;
    }


    get yTopAttack() {
        return this.y + 52;
    }


    get yBottomAttack() {
        return this.y + 80;
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
            // only for testing!!!
            if (world.keyboard.keyQ.keydown) {
                this.otherDirection = true;
            }
            if (world.keyboard.keyE.keydown) {
                this.otherDirection = false;
            }


            if (this.energy <= 0 && this.img.src.includes('death6') && !this.dead) {
                this.dead = true;
            }


            if (this.isHurt()) {
                this.hurt();
            }


            this.walk();



            if (this.isBattle(world.hero)) {
                console.log('bite: ', this.weapon.xLeft - this.xLeft, this.xCenter, this.weapon.xRight - this.xRight);
            }
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


    isHurt() {
        return world.hero.isAttack() && world.hero.isBattle() && isOnTime(world.time, this.lastHit, this.hitDelay);
    }


    hurt() {
        this.energy -= 20;
        this.lastHit = world.time + this.hitDelay;
    }


    isPursuing() {
        if (this.isTracking(this.xCenter, world.hero.xCenter)) {
            this.setObjectValue('otherDirection', true);
            console.log('case a');
            return true;
        } else if (this.isTracking(world.hero.xCenter, this.xCenter)) {
            this.setObjectValue('otherDirection', false);
            console.log('case b');
            return true;
        } else if (!isLarger(world.hero.xCenter + 80, this.xCenter)) {
            console.log('case c');
            return true;
        } else {
            return false;
        }
    }


    isTracking(valueA, valueB) {
        let difference = valueA - valueB - 80;
        return isIncluded(0, difference, 320);
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