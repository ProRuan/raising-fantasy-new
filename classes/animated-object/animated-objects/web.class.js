class Web extends AnimatedObject {
    radDispl = 32;
    thrown = false;
    collided = false;


    constructor(x, y) {
        super(source.web, x / UNIT, y / UNIT);

        this.splitFlipBook();
        this.animate();
    }


    splitFlipBook() {
        this.setProlog();
        this.setThrow();
        this.setEpilog();
    }


    setProlog() {
        this.flipBook.prolog = [this.flipBook[0]];
    }


    setThrow() {
        this.flipBook.throw = [this.flipBook[1]];
    }


    setEpilog() {
        this.flipBook.epilog = [];
        for (let i = 2; i < this.flipBook.length; i++) {
            let chapter = this.flipBook[i];
            this.flipBook.epilog.push(chapter);
        }
    }


    animate() {
        setInterval(() => {
            (this.otherDirection) ? this.x -= 2 : this.x += 2;
            // this.x -= 2;
            this.verifyCollision();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation();
        }, 100);
    }


    playAnimation() {
        if (isTrue(this.collided && this.img.src.includes('web5'))) {
            this.img.src = this.flipBook[this.flipBook.length - 1];
        } else if (isTrue(this.collided)) {
            super.playAnimation(this.flipBook.epilog);
        } else if (isTrue(this.thrown)) {
            super.playAnimation(this.flipBook.throw);
        } else {
            super.playAnimation(this.flipBook.prolog);
            this.thrown = true;
        }
    }


    verifyCollision() {
        if (isCollided(world.hero.body, this)) {
            this.collided = true;
            if (!this.currentImageSet) {
                this.currentImageSet = true;
                this.currentImage = 0;
            }
        }
    }
}