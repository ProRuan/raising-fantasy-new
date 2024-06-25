/**
 * Represents a flying grass of the type 'center'.
 * @extends GrassObject
 */
class FlyGrassC extends GrassObject {
    indentY = 44;


    /**
     * Creates a flying grass of the type 'center'.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        super(source.flyGrassC, x, y);
    }


    /**
     * Provides the center y value.
     */
    get yCenter() {
        return this.y + this.indent + this.indentY / 2;
    }


    /**
     * Provides the bottom y value.
     */
    get yBottom() {
        return this.y + this.indent + this.indentY;
    }
}