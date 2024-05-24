class Web extends AnimatedObject {
    radDispl = 32;
    speed = 2;
    thrown = false;
    collided = false;


    // jsdoc
    constructor(x, y, otherDirection) {
        super(source.web, x / UNIT, y / UNIT);
        this.setParameters(otherDirection);
        this.splitFlipBook();
    }


    // jsdoc
    setParameters(otherDirection) {
        this.otherDirection = otherDirection;
        this.speed = (otherDirection) ? -this.speed : this.speed;
    }


    // jsdoc
    splitFlipBook() {
        this.flipBook.prolog = this.getPages(0, 1);
        this.flipBook.throw = this.getPages(1, 2);
        this.flipBook.epilog = this.getPages(2, 5);
    }


    // jsdoc
    getPages(i, max) {
        let pages = [];
        this.addPages(i, max, pages);
        return pages;
    }


    // jsdoc
    addPages(i, max, pages) {
        for (; i < max; i++) {
            let page = this.flipBook[i];
            pages.push(page);
        }
    }


    act() {
        this.throw();
    }


    throw() {
        this.x += this.speed;
        this.verifyCollision();
    }


    // jsdoc
    verifyCollision() {
        if (isCollided(world.hero.body, this)) {
            this.collided = true;
            this.resetCurrentImage();
        }
    }


    // jsdoc
    resetCurrentImage() {
        if (!this.currentImageSet) {
            this.currentImageSet = true;
            this.currentImage = 0;
        }
    }


    // jsdoc
    playAnimation() {
        if (this.isFinalImage()) {
            this.setFinalImage();
        } else if (isTrue(this.collided)) {
            super.playAnimation(this.flipBook.epilog);
        } else if (isTrue(this.thrown)) {
            super.playAnimation(this.flipBook.throw);
        } else {
            super.playAnimation(this.flipBook.prolog);
            this.thrown = true;
        }
    }


    // jsdoc
    isFinalImage() {
        return isTrue(this.collided) && this.isImage('web5');
    }


    // jsdoc
    setFinalImage() {
        this.img.src = getLastElement(this.flipBook);
    }
}