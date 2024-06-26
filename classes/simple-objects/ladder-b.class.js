/**
 * Represents a ladder of the type 'bottom'.
 * @extends DrawableObject
 */
class LadderB extends DrawableObject {


    /**
     * Creates a ladder of the type 'bottom'.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        super(source.ladderB, x * UNIT, y * UNIT);
    }
}