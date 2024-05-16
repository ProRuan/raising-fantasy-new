class Dino extends MoveableObject {
    otherDirection = true;
    energy = 100;
    lastHit = 0;


    constructor(x, y) {
        super(source.dino, x, y);
        this.setFlipBook(source.dino);
        this.setCover(source.dino);
        this.loadImages();
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
        return this.width - (this.xCenter - this.x) + 28;    // hero xLeft???
    }


    get bite() {
        return {
            'xLeft': this.x + 96,
            'xRight': this.x + 124,
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
            if (world.hero.isAttack() && world.hero.isBattle()) {
                if (world.time - this.lastHit > world.hero.flipBook.attack.length * 100 / 2 && world.hero.img.src.includes('/attack2')) {
                    this.energy -= 20;
                    this.lastHit = world.time + world.hero.flipBook.attack.length * 100 / 2;
                    console.log(this.energy);
                }
            }

            if (this.bite.xLeft < world.hero.xRight && world.hero.xRight < this.bite.xRight) {
                console.log('bite');
            }
        }, 1000 / 60);


        setInterval(() => {
            if (this.energy <= 0 && this.img.src.includes('death6')) {
                this.img.src = this.flipBook.death[this.flipBook.death.length - 1];
            } else if (this.energy <= 0) {
                this.playAnimation(this.flipBook.death);
            } else if (world.hero.isAttack() && world.hero.isBattle()) {
                this.playAnimation(this.flipBook.hurt);
            } else {
                this.playAnimation(this.flipBook.idle);
            }
        }, 100);
    }
}