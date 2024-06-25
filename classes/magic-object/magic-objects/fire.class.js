/**
 * Represents a fire.
 * @extends MagicObject
 */
class Fire extends MagicObject {
    radDispl = 248;
    pages = { move: 3, collided: 9, epilog: 10 };
    bodyXY = { xLeft: 108, xCenter: 124, xRight: 140, yTop: 120, yCenter: 128, yBottom: 136 };


    /**
     * Creates a fire.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     * @param {boolean} otherDirection - A boolean value.
     */
    constructor(x, y, otherDirection) {
        super(source.fire, x, y);
        this.setMagic(otherDirection, 30, 'fire9');
        this.setSpeed(128, 0, 64);
        this.setEndX();
        this.playSound(this.sound.hit);
    }


    /**
     * Sets the end x.
     */
    setEndX() {
        this.endX = this.body.xLeft - 376;
    }


    /**
     * Casts the fire.
     */
    cast() {
        if (!isTrue(this.collided)) {
            this.applySpeedX();
            if (isGreater(this.endX, this.body.xLeft)) {
                this.applySpeedY();
            }
        }
    }


    /**
     * Applies the x speed.
     */
    applySpeedX() {
        this.x -= this.speed;
    }


    /**
     * Applies the y speed.
     */
    applySpeedY() {
        if (this.isDecentered(this, world.hero)) {
            this.y += this.speedY;
        } else if (this.isDecentered(world.hero, this)) {
            this.y -= this.speedY;
        } else {
            this.setTargetedY();
        }
    }


    /**
     * Verifies, if the fire is decentered.
     * @param {object} a - The object a to compare.
     * @param {object} b - The object b to compare.
     * @returns {boolean} - A boolean value.
     */
    isDecentered(a, b) {
        return this.isAbove(a, b) && !this.isTargetedY(b, a);
    }


    /**
     * Verifies, if the fire is above.
     * @param {object} a - The object a to compare.
     * @param {object} b - The object b to compare.
     * @returns {boolean} - A boolean value.
     */
    isAbove(a, b) {
        return isGreater(a.body.yCenter, b.body.yCenter);
    }


    /**
     * Verifies, if the fire matches the targeted y value.
     * @param {object} a - The object a to compare.
     * @param {object} b - The object b to compare.
     * @returns {boolean} - A boolean value.
     */
    isTargetedY(a, b) {
        return isGreater(a.body.yCenter, b.body.yCenter + this.speedY);
    }


    /**
     * Sets the targeted y.
     */
    setTargetedY() {
        this.y = world.hero.body.yCenter - (this.body.yCenter - this.y);
    }
}