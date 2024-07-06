/**
 * Represents a drawable object setter.
 */
class DrawableObjectSetter {
    indent = 0;


    /**
     * 
     * @param {object} source - The source object.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(source, x, y) {
        this.setUp(source, x, y);
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
        return this.x + this.width / 2;
    }


    /**
    * Provides the right x value.
    */
    get xRight() {
        return this.x + (this.width - this.indent);
    }


    /**
    * Provides the top y value.
    */
    get yTop() {
        return this.y + this.indent;
    }


    /**
    * Provides the center y value.
    */
    get yCenter() {
        return this.y + this.height / 2;
    }


    /**
    * Provides the bottom y value.
    */
    get yBottom() {
        return this.y + (this.height - this.indent);
    }


    /**
     * Sets the drawable object up.
     * @param {object} source 
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    setUp(source, x, y) {
        this.setImage(source);
        this.setPosition(x, y);
    }


    /**
     * Sets the image.
     * @param {object} source - The source object.
     */
    setImage(source) {
        this.setPath(source);
        this.setSize(source);
    }


    /**
     * Sets the path of the image.
     * @param {object} source - The source object.
     */
    setPath(source) {
        if (source.path) {
            this.img = new Image();
            this.img.src = source.path;
        }
    }


    /**
     * Sets the size of the image.
     * @param {object} source - The source object.
     */
    setSize(source) {
        this.width = this.getSize(source, 'width');
        this.height = this.getSize(source, 'height');
    }


    /**
     * Provides a paramater of the size.
     * @param {object} source - The source object.
     * @param {string} key - The key of the size parameter.
     * @returns {number} - The value of the size parameter.
     */
    getSize(source, key) {
        return (source.height) ? source[key] : source.size;
    }


    /**
     * Sets the position of the image.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    setPosition(x, y) {
        this.setX(x);
        this.setY(y);
    }


    /**
     * Sets the x value.
     * @param {number} x - The x value.
     */
    setX(x) {
        this.x = x;
    }


    /**
     * Sets the y value.
     * @param {number} y - The y value.
     */
    setY(y) {
        this.y = canvas.height - this.height - y;
    }
}