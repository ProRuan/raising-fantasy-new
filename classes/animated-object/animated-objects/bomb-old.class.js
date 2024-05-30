class Bomb extends AnimatedObject {
    speedY = 12.5;
    acceleration = 0.5;
    prolog = 4;


    inTouch = false;
    exploding = false;
    soundThrow = SOUND_BOMB_THROW;
    soundBurst = SOUND_BOMB_BURST;
    currentTime = 2.625;


    constructor(x, y) {
        super(x, y, 'bomb');
        this.setSize(256);    // Passt noch nicht!!!
        this.setOtherDirection();    // only false!!!
        this.move();
        this.animate();
    }


    setOtherDirection() {
        if (world.hero.otherDirection) {
            this.otherDirection = true;
            this.x += 16;    // set value!!!
        } else {
            this.otherDirection = false;
        }
    }


    move() {
        setInterval(() => {
            if (!this.inTouch && this.y < 540) {    // set final y value!!!
                let heightFactor = Math.round((480 - world.hero.yCenter) / 120);
                (this.otherDirection) ? this.x -= 8.5 : this.x += 8.5 - heightFactor;
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }


    animate() {
        setInterval(() => {
            (!this.inTouch) ? this.animateThrow() : this.animateExplosion();
        }, 100);
    }


    animateThrow() {
        let i = this.currentImage % this.prolog;
        let path = this.flipBook[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    animateExplosion() {
        if (!this.exploding) {
            this.currentImage = 0;
            this.exploding = true;
            let tempSound = new Audio(this.soundExplosion);
            tempSound.currentTime = this.currentTime;
            tempSound.play();
            console.log('temp sound');
            setTimeout(() => {
                world.bomb = undefined;
            }, 700);
        }
        let i = (this.currentImage % (this.flipBook.length - this.prolog) + this.prolog) % this.flipBook.length;
        let path = this.flipBook[i];
        this.img = this.imageCache[path];
        this.currentImage++;
        // setTimeout(() => {
        //     world.bombs.splice[0, 1];
        // }, 700);
    }
}