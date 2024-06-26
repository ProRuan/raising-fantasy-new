/**
 * Represents a ladder of the type 'center'.
 * @extends DrawableObject
 */
class LadderC extends DrawableObject {


    /**
     * Creates a ladder of the type 'center'.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        super(source.ladderC, x * UNIT, y * UNIT);
    }
}