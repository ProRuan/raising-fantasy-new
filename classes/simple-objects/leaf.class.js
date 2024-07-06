/**
 * Represents a leaf.
 */
class Leaf extends DrawableObject {
    indent = 4;
    pattern = /leaf(\d+)/;


    /**
     * Creates a leaf.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     * @param {number} i - The id of the leaf.
     */
    constructor(x, y, i) {
        super(source.leaf, x * UNIT, y * UNIT);
        this.setLeafType(i);
        this.setSound();
    }


    /**
     * Sets the type of the leaf.
     * @param {number} i - The id of the leaf.
     */
    setLeafType(i) {
        this.img.src = this.getPath(i);
    }


    /**
     * Provides the path of the leaf.
     * @param {number} i - The id of the leaf.
     * @returns {string} - The path of the leaf.
     */
    getPath(i) {
        return this.img.src.replace(this.pattern, `leaf${i}`);
    }


    /**
     * Triggers the effect.
     */
    triggerEffect() {
        world.hero.leaves++;
    }


    /**
     * Sets the sound.
     */
    setSound() {
        this.sound = source.leaf.sound;
    }
}