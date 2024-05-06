class FlyingGrassCenter extends GrassObject {
    indentY = 44;


    // jsdoc
    constructor(x, y) {
        super(SOURCE.flyingGrassCenter, x, y);
    }


    // jsdoc
    get yCenter() {
        return this.y + this.indent + this.indentY / 2;
    }


    // jsdoc
    get yBottom() {
        return this.y + this.indent + this.indentY;
    }
}