class GrassLeft extends GrassObject {


    constructor(x, y) {
        super(SOURCE.grassLeft, x, y);
    }


    get xLeft() {
        return this.x + this.indent;
    }


    get xCenter() {
        return this.x + this.indent + (this.width - this.indent) / 2;
    }
}