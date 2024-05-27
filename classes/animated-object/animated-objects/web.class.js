class Web extends AnimatedObject {
    radDispl = 32;
    thrown = false;
    collided = false;
    chapter = 'prolog';


    // jsdoc
    constructor(x, y, otherDirection) {
        super(source.web, x / UNIT, y / UNIT);
        this.setParameters(otherDirection, 128);
        this.splitFlipBook();
        this.move(() => this.throw());
        this.playSound(this.sound);
    }


    // jsdoc
    setParameters(otherDirection, speed) {
        this.otherDirection = otherDirection;
        this.setSpeed(speed);
    }


    // jsdoc
    splitFlipBook() {
        this.flipBook.prolog = this.getPages(0, 1);
        this.flipBook.growth = this.getPages(1, 2);
        this.flipBook.throw = this.getPages(2, 3);
        this.flipBook.hit = this.getPages(3, 4)
        this.flipBook.epilog = this.getPages(4, 5);
    }


    // jsdoc
    throw() {
        this.applySpeedType('x', this.otherDirection, 'speed');
        this.verifyCollision();
    }


    // jsdoc
    verifyCollision() {
        if (isCollided(world.hero.body, this)) {
            this.collided = true;
        }
    }


    // jsdoc
    playAnimation() {
        if (isMatch(this.chapter, 'epilog')) {
            this.playWebThrow(this.chapter);
        } else if (isTrue(this.collided)) {
            this.playWebThrow('hit', 'epilog');
        } else if (isMatch(this.chapter, 'throw')) {
            this.playWebThrow(this.chapter);
        } else if (isMatch(this.chapter, 'growth')) {
            this.playWebThrow(this.chapter, 'throw');
        } else if (isMatch(this.chapter, 'prolog')) {
            this.playWebThrow(this.chapter, 'growth');
        }
    }


    // jsdoc
    playWebThrow(chapter, next) {
        super.playAnimation(this.flipBook[chapter]);
        if (next) {
            this.chapter = next;
        }
    }
}