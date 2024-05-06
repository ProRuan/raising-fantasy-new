class GrassL extends GrassObject {


    // jsdoc
    constructor(x, y) {
        super(SOURCE.grassL, x, y);
    }


    // jsdoc
    get xLeft() {
        return this.x + this.indent;
    }


    // jsdoc
    get xCenter() {
        return this.x + this.indent + (this.width - this.indent) / 2;
    }
}