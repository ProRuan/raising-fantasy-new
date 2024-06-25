/**
 * Represents a hit point.
 * @extends AnimatedObject
 */
class HitPoint extends AnimatedObject {
    fillFactor = 0.2;


    /**
     * Creates a hit point.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        super(source.hitPoint, x, y);
    }


    /**
     * Triggers the effect.
     */
    triggerEffect() {
        this.restoreHp();
    }
}