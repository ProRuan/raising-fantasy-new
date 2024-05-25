class Fire extends MagicObject {
    prolog = 3;
    radDispl = 128;
    sound = SOUND_MAGIC_FIRE_HIT;


    constructor(x, y) {
        super(x, y, 'Fire');
        this.xStart = this.x;
        this.xEnd = this.xStart - 12 * 64;
        this.move();
        this.animate();
    }


    get xCenter() {
        return this.x + this.width / 2;
    }


    get xLeft() {
        return this.xCenter - 32;
    }


    get xRight() {
        return this.xCenter + 16;
    }


    get yCenter() {
        return this.y + this.height / 2;
    }


    get yTop() {
        return this.yCenter - 8;
    }


    get yBottom() {
        return this.yCenter + 8;
    }


    move() {
        setInterval(() => {
            if (!this.inTouch) {
                this.x -= 128 / 60;
            }
            if (this.xCenter > world.hero.xCenter + 160 && this.yCenter + 24 < world.hero.yCenter) {
                this.y += 0.25;
            } else if (this.xCenter > world.hero.xCenter + 160 && this.yCenter + 24 > world.hero.yCenter) {
                this.y -= 1.5;
            }
            // this.keep();
        }, 1000 / 60);
    }


    animate() {
        setInterval(() => {
            (!this.inTouch) ? this.animateFlight() : this.animateCollision();
        }, 100);
    }


    animateFlight() {
        let i = this.currentImage % this.prolog;
        let path = this.flipBook[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    animateCollision() {
        if (!this.colliding) {
            this.currentImage = 0;
            this.colliding = true;
            new Audio(this.sound).play();
        }
        let i = (this.currentImage % (this.flipBook.length - this.prolog) + this.prolog) % this.flipBook.length;
        let path = this.flipBook[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}