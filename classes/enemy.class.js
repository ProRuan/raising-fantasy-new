class Enemy extends MoveableObject {
    otherDirection = true;


    // jsdoc
    constructor(source, x, y) {
        super(source, x, y);
        this.setFlipBook(source);
        this.setCover(source);
        this.loadImages();
    }
}