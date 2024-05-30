class Bomb extends AnimatedObject {
    damage = 30;
    collided = false;
    bodyXY = { xLeft: 115, xCenter: 128, xRight: 141, yTop: 124, yCenter: 137, yBottom: 150 };


    constructor(x, y) {
        super(source.bomb, x, y);
        this.splitFlipBook();
        this.move(() => this.throw());
    }


    get body() {    // double code (triple code)!!!
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


    throw() {
        if (!this.collided) {
            this.y += 1;
        }
    }


    playAnimation() {
        if (this.isImage('bomb11')) {
            super.playAnimation(this.flipBook.epilog);
            this.setRemoveable();
        } else if (this.collided) {
            if (!this.currentImageReseted) {
                this.currentImageReseted = true;
                this.currentImage = 0;
            }
            super.playAnimation(this.flipBook.burst);
        } else if (!this.collided) {
            super.playAnimation(this.flipBook.throw);
        }
    }




    // tasks
    // -----
    // finish and clean shaman hurt methods ...
    // magic soung (cast + hit) ...
    // think about getter body() --> get () --> return getBody() ...
    // set firstAngerX (world.hero.x) ...
    // shaman hurt bomb ...
    // double code (this.magic)!!!
    // set endboss animation
    // set endboss battle trigger
    // set final scene
}