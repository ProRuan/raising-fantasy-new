class AnimatedObject extends DrawableObject {
    itemBook = FLIP_BOOK_ANIMATED_OBJECTS;
    magicBook = FLIP_BOOK_MAGIC;
    pattern = /([A-Z]?[a-z]+\_?[A-z]?[a-z]*).png/;
    indent = 4;


    // jsdoc
    constructor(source, x, y) {
        super(source, x * UNIT, y * UNIT);
        this.switchFlipBook(source.path);
        this.setFlipBook();
        this.loadImages();
        this.setSound();
        this.animate();
    }


    // jsdoc
    get max() {
        return world.hpBar.max;
    }


    // jsdoc
    get hpPoints() {
        return world.hpBar.points.length;
    }


    switchFlipBook(path) {
        if (path.includes('animated')) {
            this.sketchBook = this.itemBook;
        } else if (path.includes('magic')) {
            this.sketchBook = this.magicBook;
        }
    }


    // jsdoc
    getId(key) {
        return world[key].findIndex(o => o == this);
    }


    // jsdoc
    setFlipBook() {
        let chapter = this.getChapter();
        this.createFlipBook(chapter);
    }


    // jsdoc
    getChapter() {
        let chapter = this.img.src.match(this.pattern)[1];
        return formatSplitWord(chapter);
    }


    // jsdoc
    createFlipBook(chapter) {
        this.flipBook = new FlipBook(this.sketchBook)[chapter];
    }


    // jsdoc
    getPages(i, max) {
        let pages = [];
        this.addPages(i, max, pages);
        return pages;
    }


    // jsdoc
    addPages(i, max, pages) {
        for (; i < max; i++) {
            let page = this.flipBook[i];
            pages.push(page);
        }
    }


    // jsdoc
    restoreHp() {
        let newMax = this.getNewMax();
        this.restore(newMax);
    }


    // jsdoc
    getNewMax() {
        let newMax = this.calculateNewMax();
        return getVerifiedValue(this.max, newMax);
    }


    // jsdoc
    calculateNewMax() {
        return this.hpPoints + this.max * this.fillFactor;
    }


    // jsdoc
    restore(newMax) {
        world.hpBar.fill(newMax);
    }


    // jsdoc
    setSound() {
        let sound = this.getSound();
        if (sound) {
            this.sound = sound;
        }
    }


    // jsdoc
    getSound() {
        let chapter = this.getChapter();
        return source[chapter].sound;
    }


    // jsdoc
    animate() {
        this.setStoppableInterval(() => this.playAnimation(), 100);
    }
}