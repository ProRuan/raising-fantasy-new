/**
 * Represents a ladder of the type 'top'.
 * @extends DrawableObject
 */
class LadderT extends DrawableObject {


    /**
     * Creates a ladder of type 'top'.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        super(source.ladderT, x * UNIT, y * UNIT);
    }
}