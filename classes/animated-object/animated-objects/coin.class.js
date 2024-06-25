/**
 * Represents a coin.
 * @extends AnimatedObject
 */
class Coin extends AnimatedObject {


    /**
     * Creates a coin.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        super(source.coin, x, y);
    }


    /**
     * Triggers the effect.
     */
    triggerEffect() {
        world.hero.coins++;
        this.stop(true);
    }
}