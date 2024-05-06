class GrassObject extends DrawableObject {
    indent = 8;


    constructor(path, x, y) {
        super(path, x, y);
    }


    get yTop() {
        return this.y + this.indent;
    }


    get yCenter() {
        return this.y + (this.height - this.indent) / 2 + this.indent;
    }
}