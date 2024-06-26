/**
 * Represents a button.
 * @extends DrawableObject
 */
class Button extends DrawableObject {
    reachable = false;
    targeted = false;
    selected = false;
    locked = false;


    /**
     * Creates a button.
     * @param {object} source - The source object.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(source, x, y) {
        super(source, x, y);
        this.init();
    }


    /**
     * Inits the button.
     */
    init() {
        this.setPauseableInterval(() => this.trigger(), 1000 / 60);
    }


    /**
     * Triggers the button.
     */
    trigger() {
        if (isMatch(currentWorld, 'start')) {
            this.setCursor();
            this.execute();
        } else {
            this.stop(true);
        }
    }


    /**
     * Sets the cursor.
     */
    setCursor() {
        if (this.isTargeted()) {
            setCursor('pointer');
        }
    }


    /**
     * Verifies, if the button is to highlight.
     * @returns {boolean} - A boolean value.
     */
    isHighlighted() {
        return this.isTargeted() || this.isLocked() || this.isSelected();
    }


    /**
     * Verifies, if the button is targeted.
     * @returns {boolean} - A boolean value.
     */
    isTargeted() {
        return isTrue(this.reachable) && isTrue(this.targeted);
    }


    /**
     * Verifies, if the button is locked.
     * @returns {boolean} - A boolean value.
     */
    isLocked() {
        return isTrue(this.locked);
    }


    /**
     * Verifies, if the button is selected.
     * @returns {boolean} - A boolean value.
     */
    isSelected() {
        return isTrue(this.selected);
    }


    /**
     * Opens a board.
     * @param {Button} buttonA - The button a.
     * @param {object} board - The board to open.
     * @param {Button} buttonB - The botton b.
     */
    open(buttonA, board, buttonB) {
        if (isMatch(currentWorld, 'start')) {
            if (buttonA.isLocked()) {
                board.opened = true;
            } else if (this.isButtonB(buttonB)) {
                board.opened = false;
            }
        }
    }


    /**
     * Verifies, if button b keeps the board open.
     * @param {Button} button - The button b.
     * @returns {booelan} - A boolean value.
     */
    isButtonB(button) {
        return (button) ? !button.isLocked() : true;
    }


    /**
     * Sets the volume.
     * @param {string} key - The key of the volume type.
     * @param {boolean} logical - A boolean value.
     */
    setVolume(key, logical) {
        if (this.isLocked()) {
            this.locked = false;
            this.setVolumeValue(key, logical);
            save('volume');
        }
    }


    /**
     * Sets the volume value.
     * @param {string} key - The key of the volume type.
     * @param {boolean} logical - A boolean value.
     */
    setVolumeValue(key, logical) {
        if (isTrue(logical) && isGreater(volume[key], 10)) {
            volume[key]++;
            this.playSoundSample(key);
        } else if (!isTrue(logical) && isGreater(0, volume[key])) {
            volume[key]--;
            this.playSoundSample(key);
        }
    }


    /**
     * Plays a sound sample.
     * @param {string} key - The key of the volume type.
     */
    playSoundSample(key) {
        if (isMatch(key, 'sound')) {
            let audio = new Audio(source.swordDraw);
            audio.volume = volume.sound / 10;
            audio.play();
        }
    }


    /**
     * Resets the button.
     */
    reset() {
        this.reachable = false;
        this.selected = false;
        this.locked = false;
    }


    /**
     * Unlocks a button.
     * @param {string} key - The key of the button to unlock.
     */
    unlock(key) {
        if (world[key].isLocked()) {
            world[key].locked = false;
            world.setCurrentButton(key);
        }
    }
}