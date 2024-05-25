class AnimatedObject extends DrawableObject {
    indent = 4;
    pattern = /([A-Z]?[a-z]+\_?[A-z]?[a-z]*).png/;


    constructor(path, x, y) {
        super(path, x * UNIT, y * UNIT);
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


    getId(key) {
        return world[key].findIndex(o => o == this);
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


    setSound() {
        let chapter = this.getChapter();
        if (source[chapter].sound) {
            this.sound = source[chapter].sound;
        }
    }


    setAct(method) {
        this.act = this[method];
    }


    // to edit!!! + edit animate() for web!!!
    animate() {
        this.setStoppableInterval(() => this.playAnimation(), 100);
    }


    // I. edit coins, heart sounds and so on ... (0/8)
    // II. edit class AnimatedObject ...
    // III. fix bomb, star ... (0/2)
    // IV. finish web ...
}