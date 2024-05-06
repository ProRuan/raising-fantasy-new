class GrassLeft extends GrassObject {
    path = './img/tiles/grass1.png';


    // Set this.path in DrawableObject!!!


    constructor(x, y) {
        super(path, x, y);
    }


    get xLeft() {
        return this.x + this.indent;
    }


    get xCenter() {
        return this.x + (this.width - this.indent) / 2 + this.indent;
    }
}