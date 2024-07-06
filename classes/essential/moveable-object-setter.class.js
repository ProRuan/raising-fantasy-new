/**
 * Represents a moveable object setter.
 * @extends DrawableObject
 */
class MoveableObjectSetter extends DrawableObject {


    /**
     * 
     * @param {object} source - The source object.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(source, x, y) {
        super(source, x, y);
    }


    /**
     * Provides the body.
     */
    get body() {
        return this.getBody();
    }


    /**
     * Provides the weapon.
     */
    get weapon() {
        return this.getWeapon();
    }


    /**
     * Sets the animation.
     * @param {object} source - The source object.
     */
    setAnimation(source) {
        this.setFlipBook(source);
        this.setCover(source);
        this.setEpilog();
        this.loadImages();
    }


    /**
     * Sets the cover chapter of the flip book.
     * @param {object} source - The source object.
     */
    setCover(source) {
        this.flipBook.cover = [source.path];
    }


    /**
     * Sets the epilog chapter of the flip book.
     */
    setEpilog() {
        let img = getLastElement(this.flipBook.death);
        this.flipBook.epilog = [img];
    }


    /**
     * Sets the images.
     */
    setImages() {
        for (const [key] of Object.entries(this.flipBook)) {
            let chapter = this.flipBook[key];
            super.setImages(chapter);
        }
    }
}