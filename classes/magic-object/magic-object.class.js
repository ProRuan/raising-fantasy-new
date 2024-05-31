class MagicObject extends AnimatedObject {
    firstPage = 0;


    // jsdoc
    constructor(source, x, y) {
        super(source, x, y);
        this.setSound(source.sound);
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
    setSound(sound) {
        this.sound = sound;
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
    }


    // jsdoc
    splitFlipBook() {
        this.setMagicChapter('move');
        this.setMagicChapter('collided');
        this.setMagicChapter('epilog');
    }


    // jsdoc
    setMagicChapter(key) {
        let lastPage = this.pages[key];
        this.flipBook[key] = this.getPages(this.firstPage, lastPage);
        this.firstPage = lastPage;
    }


    // jsdoc
    move() {
        this.cast();
        this.soundHit();
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
    setFinalized() {
        if (this.isImage(this.epilogKey)) {
            this.finalized = true;
        }
    }


    // // jsdoc
    soundHit() {
        if (this.isHit()) {
            this.soundPlayed = true;
            this.playSound(this.sound.hit);
        }
    }


    // jsdoc
    isHit() {
        return this.collided && !this.soundPlayed;
    }
}