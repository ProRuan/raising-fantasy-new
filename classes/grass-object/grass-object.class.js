class GrassObject extends DrawableObject {
    indent = 8;


    // jsdoc
    constructor(path, x, y) {
        super(path, x * UNIT, y * UNIT);
    }


    // jsdoc
    get yTop() {
        return this.y + this.indent;
    }


    // jsdoc
    get yCenter() {
        return this.y + this.indent + (this.height - this.indent) / 2;
    }
}