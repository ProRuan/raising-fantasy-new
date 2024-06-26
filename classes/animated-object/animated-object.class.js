/**
 * Represents an animated object.
 * @extends DrawableObject
 */
class AnimatedObject extends DrawableObject {
    itemBook = FLIP_BOOK_ANIMATED_OBJECTS;
    magicBook = FLIP_BOOK_MAGIC;
    pattern = /([A-Z]?[a-z]+\_?[A-z]?[a-z]*).png/;
    indent = 4;


    /**
     * Creates an animated object.
     * @param {object} source - The source object.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(source, x, y) {
        super(source, x * UNIT, y * UNIT);
        this.switchFlipBook(source.path);
        this.setFlipBook();
        this.loadImages();
        this.setSound();
        this.animate();
    }


    /**
     * Provides the max value of hp.
     */
    get max() {
        return world.hpBar.max;
    }


    /**
     * Provides the hp.
     */
    get hpPoints() {
        return world.hpBar.points.length;
    }


    /**
     * Switches the flip book.
     * @param {string} path - The flip book path.
     */
    switchFlipBook(path) {
        if (path.includes('animated')) {
            this.sketchBook = this.itemBook;
        } else if (path.includes('magic')) {
            this.sketchBook = this.magicBook;
        }
    }


    /**
     * Provides the id of the animated object.
     * @param {string} key - The key of the animated object.
     * @returns {number} - The id of the animated object.
     */
    getId(key) {
        return world[key].findIndex(o => o == this);
    }


    /**
     * Sets the flip book.
     */
    setFlipBook() {
        let chapter = this.getChapter();
        this.createFlipBook(chapter);
    }


    /**
     * Provides the flip book chapter.
     * @returns {string} - The flip book chapter.
     */
    getChapter() {
        let chapter = this.img.src.match(this.pattern)[1];
        return formatSplitWord(chapter);
    }


    /**
     * Creates the flip book.
     * @param {string} chapter - The flip book chapter.
     */
    createFlipBook(chapter) {
        this.flipBook = new FlipBook(this.sketchBook)[chapter];
    }


    /**
     * Provides the flip book pages (images).
     * @param {number} i - The start index.
     * @param {number} max - The stop index.
     * @returns {array} - The flip book pages (images).
     */
    getPages(i, max) {
        let pages = [];
        this.addPages(i, max, pages);
        return pages;
    }


    /**
     * Adds the flip book pages.
     * @param {number} i - The start index.
     * @param {number} max - The stop index.
     * @param {array} pages - The flip book pages (images).
     */
    addPages(i, max, pages) {
        for (; i < max; i++) {
            let page = this.flipBook[i];
            pages.push(page);
        }
    }


    /**
     * Restores the hp.
     */
    restoreHp() {
        let newMax = this.getNewMax();
        world.hpBar.fill(newMax);
        this.stop(true);
    }


    /**
     * Provides the new max value of hp.
     * @returns {number} - The new max value of hp.
     */
    getNewMax() {
        let newMax = this.calculateNewMax();
        return getVerifiedValue(this.max, newMax);
    }


    /**
     * Calculates the new max value of hp.
     * @returns {number} - The new max value of hp.
     */
    calculateNewMax() {
        return this.hpPoints + this.max * this.fillFactor;
    }


    /**
     * Sets the sound.
     */
    setSound() {
        let sound = this.getSound();
        if (sound) {
            this.sound = sound;
        }
    }


    /**
     * Provides the sound.
     */
    getSound() {
        let chapter = this.getChapter();
        return source[chapter].sound;
    }


    /**
     * Animates the animated object.
     */
    animate() {
        this.setPauseableInterval(() => this.playAnimation(), 100);
    }


    /**
     * Sets the time.
     */
    setTime() {
        if (isUndefined(this.time)) {
            this.time = getSum(world.time, 100);
        }
    }
}