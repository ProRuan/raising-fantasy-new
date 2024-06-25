/**
 * Represents a flying grass of the type 'right'.
 * @extends GrassObject
 */
class FlyGrassR extends GrassObject {


    /**
     * Creates a flying grass of the type 'right'.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        super(source.flyGrassR, x, y);
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


    /**
     * Provides the bottom y value.
     */
    get yBottom() {
        return this.y + (this.height - this.indent);
    }
}