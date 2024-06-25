/**
 * Represents a grass of the type 'right'.
 * @extends GrassObject
 */
class GrassR extends GrassObject {


    /**
     * Creates a grass of the type 'right'.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        super(source.grassR, x, y);
    }


    /**
     * Provides the center x value.
     */
    get xCenter() {
        return this.x + (this.width - this.indent) / 2;
    }


    /**
     * Provides the right x value.
     */
    get xRight() {
        return this.x + (this.width - this.indent);
    }
}