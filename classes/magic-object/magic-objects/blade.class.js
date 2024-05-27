class Blade extends MagicObject {
    radDispl = 278;
    bodyXY = { xLeft: 115, xCenter: 139, xRight: 163, yTop: 121, yCenter: 129, yBottom: 137 };


    constructor(x, y, otherDirection) {
        super(source.blade, x, y);

        this.otherDirection = otherDirection;
        this.splitFlipBook();
        this.setParameters();
        super.move(() => this.move());
    }


    // jsdoc
    splitFlipBook() {
        this.flipBook.move = this.getPages(0, 3);
        this.flipBook.collided = this.getPages(3, 6);
        this.flipBook.epilog = this.getPages(6, 7);
    }


    setParameters() {    // double code!!!
        if (this.yCenter > world.hero.body.yCenter) {
            this.speed = -4;
            this.speedY = -1.88;
        } else if (this.yCenter <= world.hero.body.yCenter) {
            this.speed = -4;
            this.speedY = 0.28;
        }
    }


    move() {
        if (!isTrue(this.collided)) {
            this.x += this.speed;
            this.y += this.speedY;


        }

        if (isCollided(this.body, world.hero.body)) {
            this.collided = true;
        }
    }


    playAnimation() {
        if (isTrue(this.finalImage)) {
            super.playAnimation(this.flipBook.epilog);
            if (isUndefined(this.removeableSet)) {
                this.removeableSet = true;
                setTimeout(() => {
                    this.removeable = true;
                }, 100);
            }
        } else if (isTrue(this.collided)) {
            super.playAnimation(this.flipBook.collided);
            if (this.isImage('blade6')) {
                this.finalImage = true;
            }
        } else {
            super.playAnimation(this.flipBook.move);
        }
    }
}