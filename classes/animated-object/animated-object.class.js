class AnimatedObject extends DrawableObject {
    indent = 4;
    pattern = /([A-Z]?[a-z]+\_?[A-z]?[a-z]*).png/;


    constructor(path, x, y) {
        super(path, x * UNIT, y * UNIT);
        this.setId();
        this.setFlipBook();
        this.loadImages();
        this.setSound();
    }


    setId() {
        let chapter = this.getChapter();
        this.id = this.getId(chapter);
    }


    getId(chapter) {
        return counter[chapter]++;
    }


    setFlipBook() {
        let chapter = this.getChapter();
        this.createFlipBook(chapter);
    }


    getChapter() {
        let chapter = this.img.src.match(this.pattern)[1];
        return formatSplitWord(chapter);
    }


    createFlipBook(chapter) {
        this.flipBook = new FlipBook(FLIP_BOOK_ANIMATED_OBJECTS)[chapter];
    }


    setSound() {
        let chapter = this.getChapter();
        if (source[chapter].sound) {
            this.sound = source[chapter].sound;
        }
    }
}