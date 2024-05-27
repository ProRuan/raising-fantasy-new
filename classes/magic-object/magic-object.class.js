class MagicObject extends AnimatedObject {


    // jsdoc
    constructor(path, x, y) {
        super(path, x, y);
    }


    // jsdoc (double code?)
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
    setMagic(otherDirection, damage, epilogKey) {
        this.setParameters(otherDirection, damage, epilogKey);
        this.splitFlipBook();
        super.move(() => this.move());
    }


    // jsdoc
    setParameters(otherDirection, damage, epilogKey) {
        this.otherDirection = otherDirection;
        this.damage = damage;
        this.epilogKey = epilogKey
        this.setSpeed();
    }


    // jsdoc
    setSpeed() {
        if (isGreater(world.hero.body.yCenter, this.yCenter)) {
            super.setSpeed(this.speedXY.s, 0, this.speedXY.yUp);
        } else {
            super.setSpeed(this.speedXY.s, 0, this.speedXY.yDown);
        }
    }


    // jsdoc
    splitFlipBook() {
        this.setMagicChapter('move');
        this.setMagicChapter('collided');
        this.setMagicChapter('epilog');
    }


    // jsdoc
    setMagicChapter(key) {
        let pages = this.pages[key];
        this.flipBook[key] = this.getPages(pages[0], pages[1]);
    }


    // jsdoc
    playAnimation() {
        if (isTrue(this.finalized)) {
            super.playAnimation(this.flipBook.epilog);
            this.setRemoveable();
        } else if (isTrue(this.collided)) {
            super.playAnimation(this.flipBook.collided);
            this.setFinalized();
        } else {
            super.playAnimation(this.flipBook.move);
        }
    }


    // jsdoc
    setRemoveable() {
        if (isUndefined(this.removeableSet)) {
            this.removeableSet = true;
            setTimeout(() => {
                this.removeable = true;
            }, 100);
        }
    }


    // jsdoc
    setFinalized() {
        if (this.isImage(this.epilogKey)) {
            this.finalized = true;
        }
    }
}