/**
 * Represents a magic object.
 * @extends AnimatedObject
 */
class MagicObject extends AnimatedObject {
    firstPage = 0;


    /**
     * Creates a magic object.
     * @param {object} source - The source object.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(source, x, y) {
        super(source, x, y);
        this.setSound(source.sound);
    }


    /**
     * Provides the body.
     */
    get body() {
        return this.getBody();
    }


    /**
     * Sets the sound.
     * @param {object} sound - The sound object.
     */
    setSound(sound) {
        this.sound = sound;
    }


    /**
     * Sets the magic.
     * @param {boolean} otherDirection - A boolean value.
     * @param {number} damage - The damage value.
     * @param {string} epilogKey - The key of the pre-epilog image.
     */
    setMagic(otherDirection, damage, epilogKey) {
        this.setParameters(otherDirection, damage, epilogKey);
        this.splitFlipBook();
        super.move(() => this.move());
    }


    /**
     * Sets the parameters.
     * @param {boolean} otherDirection - A boolean value.
     * @param {number} damage - The damage value.
     * @param {string} epilogKey - The key of the pre-epilog image.
     */
    setParameters(otherDirection, damage, epilogKey) {
        this.otherDirection = otherDirection;
        this.damage = damage;
        this.epilogKey = epilogKey
    }


    /**
     * Splits the flip book.
     */
    splitFlipBook() {
        this.setMagicChapter('move');
        this.setMagicChapter('collided');
        this.setMagicChapter('epilog');
    }


    /**
     * Sets the magic chapter.
     * @param {string} key - The key of the flip book chapter.
     */
    setMagicChapter(key) {
        let lastPage = this.pages[key];
        this.flipBook[key] = this.getPages(this.firstPage, lastPage);
        this.firstPage = lastPage;
    }


    /**
     * Moves the magic.
     */
    move() {
        this.cast();
        this.soundHit();
    }


    /**
     * Plays the animation.
     */
    playAnimation() {
        if (isTrue(this.finalized)) {
            super.playAnimation(this.flipBook.epilog);
            this.setTime();
        } else if (isTrue(this.collided)) {
            super.playAnimation(this.flipBook.collided);
            this.setFinalized();
        } else {
            super.playAnimation(this.flipBook.move);
        }
    }


    /**
     * Unlocks the final animation.
     */
    setFinalized() {
        if (this.isImage(this.epilogKey)) {
            this.finalized = true;
        }
    }


    /**
     * Sounds the hit.
     */
    soundHit() {
        if (this.isHit()) {
            this.soundPlayed = true;
            this.playSound(this.sound.hit);
        }
    }


    /**
     * Verifies, if the magic hits.
     * @returns {boolean} - A boolean value.
     */
    isHit() {
        return this.collided && !this.soundPlayed;
    }
}