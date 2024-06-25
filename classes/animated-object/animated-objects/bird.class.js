/** 
 * Represents a bird.
 * @extends AnimatedObject
 */
class Bird extends AnimatedObject {


    /**
     * Creates a bird.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        super(source.bird, x, y);
        this.setSpeed(32);
        this.move(() => this.floatPermanently());
    }
}