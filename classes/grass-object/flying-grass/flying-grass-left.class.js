class FlyingGrassLeft extends GrassObject {


    // jsdoc
    constructor(x, y) {
        super(SOURCE.flyingGrassLeft, x, y);
    }


    // jsdoc
    get xLeft() {
        return this.x + this.indent;
    }


    // jsdoc
    get xCenter() {
        return this.x + this.indent + (this.width - this.indent) / 2;
    }


    // jsdoc
    get yBottom() {
        return this.y + (this.height - this.indent);
    }
}