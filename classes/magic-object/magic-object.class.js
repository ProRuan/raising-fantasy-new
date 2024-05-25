class MagicObject extends AnimatedObject {
    sketchBook = FLIP_BOOK_MAGIC;
    otherDirection = true;
    inTouch = false;
    collided = false;


    // jsdoc
    constructor(path, x, y) {
        super(path, x, y);
    }
}