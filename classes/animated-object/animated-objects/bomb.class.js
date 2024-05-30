class Bomb extends AnimatedObject {
    speedY = 12.5;
    acceleration = 0.5;
    damage = 30;
    collided = false;
    bodyXY = { xLeft: 115, xCenter: 128, xRight: 141, yTop: 124, yCenter: 137, yBottom: 150 };


    // jsdoc
    constructor(x, y) {
        super(source.bomb, x, y);
        this.splitFlipBook();
        this.move(() => this.throw());
    }


    // jsdoc
    get body() {
        return {
            'xLeft': this.x + this.bodyXY.xLeft,
            'xCenter': this.x + this.bodyXY.xCenter,
            'xRight': this.x + this.bodyXY.xRight,
            'yTop': this.y + this.bodyXY.yTop,
            'yCenter': this.y + this.bodyXY.yCenter,
            'yBottom': this.y + this.bodyXY.yBottom
        };
    }


    // jsdoc
    splitFlipBook() {
        this.flipBook.throw = this.getPages(0, 4);
        this.flipBook.burst = this.getPages(4, 11);
        this.flipBook.epilog = this.getEpilog();
    }


    // jsdoc
    getEpilog() {
        return [getLastElement(this.flipBook)];
    }


    // jsdoc
    throw() {
        if (!this.collided) {
            this.applySpeedX();
            this.applySpeedY();
        }
    }


    // jsdoc
    applySpeedX() {
        let heightFactor = this.getHeightFactor();
        this.x += canvas.height / UNIT - heightFactor;
    }


    // jsdoc
    getHeightFactor() {
        return Math.round((world.hero.basicLevel - world.hero.groundLevel) / 120);
    }


    // jsdoc
    applySpeedY() {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
    }


    // jsdoc
    playAnimation() {
        if (this.isImage('bomb11')) {
            super.playAnimation(this.flipBook.epilog);
            this.setRemoveable();
        } else if (this.collided) {
            this.resetCurrentImage();
            super.playAnimation(this.flipBook.burst);
        } else if (!this.collided) {
            super.playAnimation(this.flipBook.throw);
        }
    }


    // jsdoc
    resetCurrentImage() {
        if (!this.currentImageReset) {
            this.currentImageReset = true;
            this.currentImage = 0;
        }
    }
}