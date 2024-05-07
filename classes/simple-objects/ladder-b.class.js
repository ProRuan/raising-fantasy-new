class LadderB extends DrawableObject {


    // jsdoc
    constructor(x, y) {
        super(SOURCE.ladderB, x, y);
    }


    // jsdoc
    get yCenter() {
        return this.y + this.height / 2 - this.height;
    }
}