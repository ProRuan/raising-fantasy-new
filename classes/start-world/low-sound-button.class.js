/**
 * Represents a low sound button.
 * @extends Button
 */
class LowSoundButton extends Button {
    indent = -6;
    previous = 'highMusicButton';
    next = 'highSoundButton';
    shadowColor = 'white';
    shadowBlur = 16;


    /**
     * Creates a low sound button.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        super(source.arrowLeft, x + 25, y - 193.5);
    }


    /**
     * Executes the task of the button.
     */
    execute() {
        this.setVolume('sound', false);
    }
}