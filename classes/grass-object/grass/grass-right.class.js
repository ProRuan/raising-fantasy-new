class GrassRight extends GrassObject {


    constructor(x, y) {
        super(SOURCE.grassRight, x, y);
    }


    get xCenter() {
        return this.x + (this.width - this.indent) / 2;
    }


    get xRight() {
        return this.x + (this.width - this.indent);
    }
}