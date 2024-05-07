class MagicObject extends AnimatedObject {
    otherDirection = true;
    inTouch = false;
    colliding = false;


    // jsdoc
    constructor(path, x, y) {
        super(path, x, y);
    }


    // jsdoc
    createFlipBook(chapter) {
        this.flipBook = new FlipBook(FLIP_BOOK_MAGIC)[chapter];
    }
}