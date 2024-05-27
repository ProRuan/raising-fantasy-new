class Blade extends MagicObject {
    speed = 192 / 60;
    prolog = 3;
    radDispl = 152;
    sound = SOUND_MAGIC_FIRE_HIT;


    constructor(x, y) {
        super(x, y, 'Blade');
        this.xStart = this.x;
        this.xEnd = this.xStart - 12 * 64 - 64;
        this.move();
        this.animate();
    }


    move() {
        setInterval(() => {
            if (!this.directionSet) {    // at the constructor()???
                this.speedY = (world.hero.yCenter > world.ENDBOSS.yCenter) ? 0.125 : -1.625;
                this.directionSet = true;
            }
            if (!this.inTouch) {
                this.x -= this.speed;
                this.y += this.speedY;
            }
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