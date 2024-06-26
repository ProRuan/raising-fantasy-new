/**
 * Represents an avatar info.
 * @extends DrawableObject
 */
class AvatarInfo extends DrawableObject {


    /**
     * Creates an avatar info.
     * @param {object} source - The source object.
     */
    constructor(source) {
        super(source, source.x, source.y);
        this.setTranslation(source.x);
    }


    /**
     * Sets the translation of the object.
     * @param {number} x - The x value. 
     */
    setTranslation(x) {
        this.translation = x;
    }
}