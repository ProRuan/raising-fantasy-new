/**
 * Represents a tree.
 * @extends DrawableObject
 */
class Tree extends DrawableObject {


    /**
     * Creates a tree.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        super(source.tree, x * UNIT, y * UNIT);
    }
}