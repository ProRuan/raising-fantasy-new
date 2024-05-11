class FlyGrassR extends GrassObject {


    // jsdoc
    constructor(x, y) {
        super(source.flyGrassR, x, y);
    }

    // jsdoc
    get xCenter() {
        return this.x + (this.width - this.indent) / 2;
    }


    // jsdoc
    get xRight() {
        return this.x + (this.width - this.indent);
    }


    // jsdoc
    get yBottom() {
        return this.y + (this.height - this.indent);
    }
}