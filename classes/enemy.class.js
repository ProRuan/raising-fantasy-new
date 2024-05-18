class Enemy extends MoveableObject {
    otherDirection = true;
    chapter = 'idle';


    // jsdoc
    constructor(source, x, y) {
        super(source, x, y);
        this.setFlipBook(source);    // double code???
        this.setCover(source);    // double code???
        this.setEpilog();    // double code???
        this.loadImages();    // double code???
    }
}