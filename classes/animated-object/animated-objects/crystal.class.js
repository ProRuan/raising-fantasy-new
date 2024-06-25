/**
 * Represents a crystal.
 * @extends AnimatedObject
 */
class Crystal extends AnimatedObject {


    /**
     * Creates a crystal.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        super(source.crystal, x, y);
    }


    /**
     * Triggers the effect.
     */
    triggerEffect() {
        this.release();
        this.stop(true);
    }


    /**
     * Releases hero features.
     */
    release() {
        world.hero.bombUnlocked = true;
        world.hero.xStopRight = source.endX;
        world.hero.xStopLeft = source.crystalCollectedX;
        world.hero.soundUpgrade();
    }
}