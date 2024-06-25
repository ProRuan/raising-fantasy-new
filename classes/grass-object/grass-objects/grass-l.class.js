/**
 * Represents a grass of the type 'left'.
 * @extends GrassObject
 */
class GrassL extends GrassObject {


    /**
     * Creates a grass of the type 'left'.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        super(source.grassL, x, y);
    }


    /**
     * Provides the left x value.
     */
    get xLeft() {
        return this.x + this.indent;
    }


    /**
     * Provides the center x value.
     */
    get xCenter() {
        return this.x + this.indent + (this.width - this.indent) / 2;
    }
}