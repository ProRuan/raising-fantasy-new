/**
 * Represents a grass of the type 'center'.
 * @extends GrassObject
 */
class GrassC extends GrassObject {


    /**
     * Creates a grass of the type 'center'.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        super(source.grassC, x, y);
    }
}