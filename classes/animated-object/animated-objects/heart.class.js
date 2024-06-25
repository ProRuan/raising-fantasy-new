/**
 * Represents a heart.
 * @extends AnimatedObject
 */
class Heart extends AnimatedObject {
    fillFactor = 0.5;


    /**
     * Creates a heart.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        super(source.heart, x, y);
    }


    /**
     * Triggers the effect.
     */
    triggerEffect() {
        this.restoreHp();
    }
}