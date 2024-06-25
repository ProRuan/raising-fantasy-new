/**
 * Represents a flying grass of the type 'left'.
 * @extends GrassObject
 */
class FlyGrassL extends GrassObject {


    /**
     * Creates a new flying grass of the type 'left'.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        super(source.flyGrassL, x, y);
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


    /**
     * Provides the bottom y value.
     */
    get yBottom() {
        return this.y + (this.height - this.indent);
    }
}