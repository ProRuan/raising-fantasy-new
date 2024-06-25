/**
 * Represents a bomb.
 * @extends AnimatedObject
 */
class Bomb extends AnimatedObject {
    speedY = 12.5;
    acceleration = 0.5;
    damage = 30;
    collided = false;
    bodyXY = { xLeft: 115, xCenter: 128, xRight: 141, yTop: 124, yCenter: 137, yBottom: 150 };
    bombThrow = source.bombThrow;
    bombBurst = source.bombBurst;
    burstDelay = 2.7;


    /**
     * Creates a bomb.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        super(source.bomb, x, y);
        this.splitFlipBook();
        this.move(() => this.throw());
        this.playSound(this.bombThrow);
    }


    /**
     * Provides this body.
     */
    get body() {
        return this.getBody();
    }


    /**
     * Splits the flip book.
     */
    splitFlipBook() {
        this.flipBook.throw = this.getPages(0, 4);
        this.flipBook.burst = this.getPages(4, 11);
        this.flipBook.epilog = this.getEpilog();
    }


    /**
     * Provides the flip book chapter epilog.
     * @returns {array} - The flip book chapter epilog.
     */
    getEpilog() {
        return [getLastElement(this.flipBook)];
    }


    /**
     * Throws the bomb.
     */
    throw() {
        if (!this.collided) {
            this.applySpeedX();
            this.applySpeedY();
        }
    }


    /**
     * Applies the x speed.
     */
    applySpeedX() {
        let heightFactor = this.getHeightFactor();
        let speed = canvas.height / UNIT - heightFactor;
        this.x += speed;
    }


    /**
     * Provides the height factor.
     * @returns {number} - The height factor.
     */
    getHeightFactor() {
        let heightDiff = world.hero.basicLevel - world.hero.groundLevel;
        return Math.round(heightDiff / 120);
    }


    /**
     * Applies the y speed.
     */
    applySpeedY() {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
    }


    /**
     * Plays the animation.
     */
    playAnimation() {
        if (this.isImage('bomb11')) {
            super.playAnimation(this.flipBook.epilog);
            this.setTime();
        } else if (this.collided) {
            this.resetCurrentImage();
            super.playAnimation(this.flipBook.burst);
        } else if (!this.collided) {
            super.playAnimation(this.flipBook.throw);
        }
    }


    /**
     * Resets the current image.
     */
    resetCurrentImage() {
        if (!this.currentImageReset) {
            this.currentImageReset = true;
            this.currentImage = 0;
        }
    }


    /**
     * Bursts the bomb.
     * @param {Enemy} enemy - The enemy.
     */
    burst(enemy) {
        this.collided = true;
        this.playSound(this.bombBurst, this.burstDelay);
        enemy.hp -= this.damage;
    }
}