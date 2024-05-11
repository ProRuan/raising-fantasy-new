class GrassR extends GrassObject {


    // jsdoc
    constructor(x, y) {
        super(source.grassR, x, y);
    }

    // jsdoc
    get xCenter() {
        return this.x + (this.width - this.indent) / 2;
    }


    // jsdoc
    get xRight() {
        return this.x + (this.width - this.indent);
    }
}