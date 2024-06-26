/**
 * Represents a cloud.
 * @extends DrawableObject
 */
class Cloud extends DrawableObject {


    /**
     * Creates a Cloud.
     * @param {number} x - The x value.
     */
    constructor(x) {
        super(source.cloud, x * canvas.width, 0);
        this.setSpeed(4);
        this.move(() => this.floatPermanently());
    }
}