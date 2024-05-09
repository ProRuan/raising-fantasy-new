class AnimatedObject extends DrawableObject {
    indent = 4;
    pattern = /([A-Z]?[a-z]+\_?[A-z]?[a-z]*).png/;


    constructor(path, x, y) {
        super(path, x * UNIT, y * UNIT);
        this.setFlipBook();
        this.loadImages();
    }


    setFlipBook() {
        let chapter = this.getChapter();
        chapter = formatSplitWord(chapter);
        this.createFlipBook(chapter);
    }


    getChapter() {
        return this.img.src.match(this.pattern)[1];
    }


    createFlipBook(chapter) {
        this.flipBook = new FlipBook(FLIP_BOOK_ANIMATED_OBJECTS)[chapter];
    }
}