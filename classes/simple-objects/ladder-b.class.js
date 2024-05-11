class LadderB extends DrawableObject {


    // jsdoc
    constructor(x, y) {
        super(source.ladderB, x * UNIT, y * UNIT);
    }


    // jsdoc
    get yCenter() {
        return this.y + this.height / 2 - this.height;
    }
}