/**
 * Represents a web.
 * @extends AnimatedObject
 */
class Web extends AnimatedObject {
    radDispl = 32;
    thrown = false;
    collided = false;
    chapter = 'prolog';


    /**
     * Creates a web.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     * @param {boolean} otherDirection - The other direction.
     */
    constructor(x, y, otherDirection) {
        super(source.web, x / UNIT, y / UNIT);
        this.setParameters(otherDirection, 128);
        this.splitFlipBook();
        this.move(() => this.throw());
        this.playSound(this.sound);
    }


    /**
     * Sets parameters.
     * @param {boolean} otherDirection - The other direction.
     * @param {number} speed - The speed.
     */
    setParameters(otherDirection, speed) {
        this.otherDirection = otherDirection;
        this.setSpeed(speed);
    }


    /**
     * Splits the flip book.
     */
    splitFlipBook() {
        this.flipBook.prolog = this.getPages(0, 1);
        this.flipBook.growth = this.getPages(1, 2);
        this.flipBook.throw = this.getPages(2, 3);
        this.flipBook.hit = this.getPages(3, 4);
        this.flipBook.epilog = this.getPages(4, 5);
    }


    /**
     * Throws the web.
     */
    throw() {
        this.applySpeedType('x', this.otherDirection, 'speed');
        this.verifyCollision();
    }


    /**
     * Verifies the collision.
     */
    verifyCollision() {
        if (world.hero.body && isCollided(world.hero.body, this)) {
            this.collided = true;
        }
    }


    /**
     * Plays the animation.
     */
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


    /**
     * Plays the web throw.
     * @param {string} chapter - The flip book chapter.
     * @param {string} next - The next flip book chapter.
     */
    playWebThrow(chapter, next) {
        super.playAnimation(this.flipBook[chapter]);
        this.setNextChapter(next);
    }


    /**
     * Sets the next flip book chapter.
     * @param {string} next - The next flip book chapter.
     */
    setNextChapter(next) {
        if (next) {
            this.chapter = next;
        }
    }
}