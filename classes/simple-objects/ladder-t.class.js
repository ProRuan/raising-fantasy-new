class LadderT extends DrawableObject {


    // jsdoc
    constructor(x, y) {
        super(SOURCE.ladderT, x * UNIT, y * UNIT);
    }


    // jsdoc
    get yCenter() {
        return this.y + this.height / 2 - this.height / 2;
    }
}