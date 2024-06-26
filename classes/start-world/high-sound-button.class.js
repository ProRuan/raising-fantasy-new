/**
 * Represents a high sound button.
 * @extends Button
 */
class HighSoundButton extends Button {
    indent = -6;
    previous = 'lowSoundButton';
    next = 'cupButton';
    shadowColor = 'white';
    shadowBlur = 16;


    /**
     * Creates a high sound button.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        super(source.arrowRight, x + 125, y - 193.5);
    }


    /**
     * Executes the task of the button.
     */
    execute() {
        this.setVolume('sound', true);
    }
}