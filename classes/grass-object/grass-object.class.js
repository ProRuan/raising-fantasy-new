/**
 * Represents a grass object.
 * @extends DrawableObject
 */
class GrassObject extends DrawableObject {
    indent = 8;


    /**
     * Creates a new grass object.
     * @param {string} path - The image path.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(path, x, y) {
        super(path, x * UNIT, y * UNIT);
    }


    /**
     * Provides the top y value.
     */
    get yTop() {
        return this.y + this.indent;
    }


    /** 
     * Provides the center y value.
     */
    get yCenter() {
        return this.y + this.indent + (this.height - this.indent) / 2;
    }
}